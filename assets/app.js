/* ============================================================
   Quantum Path - SPA engine
   - Module registry (each content/<mod>/module.js self-registers)
   - Hash router:  #/  #/m/<mod>  #/l/<mod>/<lesson>  #/lab  #/about
   - Bilingual EN/VI, theme, progress (localStorage), quiz engine
   - Lessons are fetched HTML fragments (content/<mod>/<lesson>.<lang>.html)
   - KaTeX renders math after each injection
   ============================================================ */
(function () {
  "use strict";

  var STORE_KEY = "qp.v2";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- persistent state ---------- */
  function todayStr(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function load() {
    var s;
    try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { s = null; }
    if (!s || typeof s !== "object") s = {};
    s.completed = Array.isArray(s.completed) ? s.completed : [];
    s.lang = (s.lang === "vi" || s.lang === "en") ? s.lang : (navigator.language && navigator.language.slice(0, 2) === "vi" ? "vi" : "en");
    s.theme = (s.theme === "dark" || s.theme === "light") ? s.theme : null;
    s.streak = s.streak || 0;
    // streak bookkeeping
    var t = todayStr();
    if (s.lastVisit !== t) {
      var y = new Date(); y.setDate(y.getDate() - 1);
      s.streak = (s.lastVisit === todayStr(y)) ? (s.streak || 0) + 1 : 1;
      s.lastVisit = t;
    }
    return s;
  }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }
  var state = load();

  /* ---------- module registry ---------- */
  var MODULES = [];
  var lessonIndex = {}; // lessonId -> {mod, lesson, flatIndex}
  var flatLessons = []; // ordered [{mod, lesson}]

  var QP = window.QP = window.QP || {};
  QP.registerModule = function (m) { MODULES.push(m); };

  function buildIndex() {
    MODULES.sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
    flatLessons = [];
    lessonIndex = {};
    MODULES.forEach(function (m) {
      (m.lessons || []).forEach(function (l) {
        var entry = { mod: m, lesson: l };
        lessonIndex[l.id] = entry;
        entry.flatIndex = flatLessons.length;
        flatLessons.push(entry);
      });
    });
  }

  /* ---------- i18n (UI chrome only; lesson bodies are per-lang files) ---------- */
  var T = {
    en: {
      brandTag: "A field guide to quantum computing",
      navHome: "Course", navLab: "Practice Lab", navAbout: "About",
      progress: "complete", resume: "Resume", start: "Start learning",
      lessons: "lessons", minutes: "min", module: "Module",
      markDone: "Mark lesson complete", done: "Completed", markUndo: "Completed - click to undo",
      prev: "Previous", next: "Next", backToModule: "Back to module",
      takeaways: "Key takeaways", checkYourself: "Check yourself",
      submit: "Check answer", correct: "Correct", incorrect: "Not quite",
      yourProgress: "Your progress", streak: "day streak", of: "of",
      allDone: "You have completed every lesson. Beautiful work.",
      courseOverview: "The course", overviewLede: "Eight modules take you from the underlying mathematics to the algorithms and hardware defining the field today. Work at your own pace - progress saves on this device.",
      labTitle: "Practice Lab", labLede: "Reading is not enough. Manipulate qubits directly: apply gates, watch the state move, and read off measurement probabilities.",
      quizScore: "score", tryAll: "Answer each question, then check.",
      langName: "English", notFound: "Lesson not found.",
      estRead: "read", continueLearning: "Keep the momentum going",
      bannerLede: "One lesson a day compounds. Your streak and completed lessons live on this device.",
      moduleProgress: "done"
    },
    vi: {
      brandTag: "Cẩm nang học điện toán lượng tử",
      navHome: "Khoá học", navLab: "Phòng thực hành", navAbout: "Giới thiệu",
      progress: "hoàn thành", resume: "Học tiếp", start: "Bắt đầu học",
      lessons: "bài", minutes: "phút", module: "Chương",
      markDone: "Đánh dấu đã học xong", done: "Đã xong", markUndo: "Đã xong - bấm để bỏ",
      prev: "Bài trước", next: "Bài sau", backToModule: "Về chương",
      takeaways: "Ý chính cần nhớ", checkYourself: "Tự kiểm tra",
      submit: "Kiểm tra", correct: "Chính xác", incorrect: "Chưa đúng",
      yourProgress: "Tiến độ của bạn", streak: "ngày liên tục", of: "trên",
      allDone: "Bạn đã hoàn thành toàn bộ bài học. Tuyệt vời.",
      courseOverview: "Nội dung khoá học", overviewLede: "Tám chương đưa bạn từ nền tảng toán học tới các thuật toán và phần cứng đang định hình lĩnh vực này. Học theo nhịp của bạn - tiến độ được lưu trên thiết bị này.",
      labTitle: "Phòng thực hành", labLede: "Chỉ đọc là chưa đủ. Hãy thao tác trực tiếp với qubit: áp dụng cổng, quan sát trạng thái dịch chuyển, và đọc xác suất đo được.",
      quizScore: "điểm", tryAll: "Trả lời từng câu rồi bấm kiểm tra.",
      langName: "Tiếng Việt", notFound: "Không tìm thấy bài học.",
      estRead: "đọc", continueLearning: "Giữ vững nhịp học",
      bannerLede: "Mỗi ngày một bài sẽ tích luỹ dần. Chuỗi ngày và số bài đã học được lưu trên thiết bị này.",
      moduleProgress: "xong"
    }
  };
  function t(k) { return (T[state.lang] && T[state.lang][k]) || T.en[k] || k; }
  function loc(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[state.lang] != null ? obj[state.lang] : (obj.en != null ? obj.en : "");
  }

  /* ---------- progress helpers ---------- */
  function isDone(id) { return state.completed.indexOf(id) !== -1; }
  function setDone(id, val) {
    var i = state.completed.indexOf(id);
    if (val && i === -1) state.completed.push(id);
    if (!val && i !== -1) state.completed.splice(i, 1);
    save();
  }
  function totalLessons() { return flatLessons.length; }
  function doneCount() {
    return flatLessons.filter(function (e) { return isDone(e.lesson.id); }).length;
  }
  function moduleDone(m) {
    return (m.lessons || []).filter(function (l) { return isDone(l.id); }).length;
  }
  function firstIncomplete() {
    for (var i = 0; i < flatLessons.length; i++) if (!isDone(flatLessons[i].lesson.id)) return flatLessons[i];
    return null;
  }

  /* ---------- KaTeX render ---------- */
  function renderMath(el) {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "\\[", right: "\\]", display: true },
            { left: "\\(", right: "\\)", display: false },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      } catch (e) {}
    }
  }

  /* ---------- small DOM builder ---------- */
  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") el.className = attrs[k];
      else if (k === "html") el.innerHTML = attrs[k];
      else if (k === "text") el.textContent = attrs[k];
      else if (k.slice(0, 2) === "on" && typeof attrs[k] === "function") el.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) el.setAttribute(k, attrs[k]);
    });
    if (children != null) (Array.isArray(children) ? children : [children]).forEach(function (c) {
      if (c == null) return;
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return el;
  }

  /* ---------- chrome (header/footer) ---------- */
  function renderChrome() {
    var root = document.documentElement;
    if (state.theme) root.setAttribute("data-theme", state.theme);
    else root.removeAttribute("data-theme");

    var header = document.getElementById("app-header");
    header.innerHTML = "";
    var dc = doneCount(), tot = totalLessons();
    header.appendChild(h("div", { class: "wrap nav-row" }, [
      h("a", { class: "brand", href: "#/", "aria-label": "Quantum Path home" }, [
        brandMark(), h("span", { class: "brand-text" }, [
          h("strong", {}, "Quantum Path"),
          h("small", { class: "brand-tag" }, t("brandTag"))
        ])
      ]),
      h("nav", { class: "top-nav", "aria-label": "Primary" }, [
        navLink("#/", t("navHome")),
        navLink("#/lab", t("navLab")),
        navLink("#/about", t("navAbout"))
      ]),
      h("div", { class: "nav-tools" }, [
        h("span", { class: "progress-pill", title: t("yourProgress") }, dc + " / " + tot),
        langToggle(),
        themeToggle()
      ])
    ]));

    var footer = document.getElementById("app-footer");
    footer.innerHTML = "";
    footer.appendChild(h("div", { class: "wrap" }, [
      h("p", { class: "foot-lede" }, t("bannerLede")),
      h("p", { class: "fine" }, "Quantum Path - open, self-paced, bilingual (EN / Tiếng Việt). Built with real mathematics via KaTeX. Progress stored only in this browser.")
    ]));
  }

  function navLink(href, label) {
    var cur = location.hash || "#/";
    var active = (href === "#/" && (cur === "#/" || cur.indexOf("#/l/") === 0 || cur.indexOf("#/m/") === 0)) ||
      (href !== "#/" && cur.indexOf(href) === 0);
    return h("a", { href: href, class: "top-link" + (active ? " is-active" : "") }, label);
  }
  function langToggle() {
    return h("button", {
      class: "chip-btn", type: "button", "aria-label": "Language",
      onclick: function () { state.lang = state.lang === "en" ? "vi" : "en"; save(); rerender(); }
    }, [
      h("span", { class: state.lang === "en" ? "on" : "" }, "EN"),
      h("span", { class: "sep" }, "/"),
      h("span", { class: state.lang === "vi" ? "on" : "" }, "VI")
    ]);
  }
  function themeToggle() {
    var isDark = state.theme === "dark" || (!state.theme && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    return h("button", {
      class: "chip-btn icon", type: "button", "aria-label": "Toggle light/dark",
      onclick: function () { state.theme = isDark ? "light" : "dark"; save(); rerender(); }
    }, isDark ? "☀" : "☽");
  }
  function brandMark() {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 32 32"); svg.setAttribute("class", "brand-mark"); svg.setAttribute("aria-hidden", "true");
    [0, 60, 120].forEach(function (r) {
      var e = document.createElementNS(ns, "ellipse");
      e.setAttribute("cx", "16"); e.setAttribute("cy", "16"); e.setAttribute("rx", "14"); e.setAttribute("ry", "5.5");
      e.setAttribute("fill", "none"); e.setAttribute("stroke", "currentColor"); e.setAttribute("stroke-width", "1.6");
      e.setAttribute("opacity", "0.55"); e.setAttribute("transform", "rotate(" + r + " 16 16)");
      svg.appendChild(e);
    });
    var c = document.createElementNS(ns, "circle");
    c.setAttribute("cx", "16"); c.setAttribute("cy", "16"); c.setAttribute("r", "2.6"); c.setAttribute("fill", "currentColor");
    svg.appendChild(c);
    return svg;
  }

  /* ---------- views ---------- */
  var app = function () { return document.getElementById("app"); };

  function viewHome() {
    var el = app(); el.innerHTML = "";
    var dc = doneCount(), tot = totalLessons();
    var pct = tot ? Math.round(dc / tot * 100) : 0;
    var next = firstIncomplete();

    // hero
    var hero = h("section", { class: "hero" }, [
      h("canvas", { class: "hero-canvas", id: "hero-canvas", "aria-hidden": "true" }),
      h("div", { class: "wrap hero-inner" }, [
        h("p", { class: "eyebrow" }, t("brandTag")),
        h("h1", { class: "hero-h1" }, state.lang === "vi"
          ? "Học lượng tử một cách nghiêm túc, từ toán nền tảng tới thuật toán."
          : "Learn quantum seriously, from the mathematics to the algorithms."),
        h("p", { class: "lede" }, state.lang === "vi"
          ? "Không cần bằng vật lý để bắt đầu. Mỗi bài xây trên bài trước - có toán thật, ví dụ có lời giải, câu hỏi tự kiểm tra, và một phòng thực hành để thao tác trực tiếp với qubit."
          : "No physics degree required to begin. Every lesson builds on the last - with real mathematics, worked examples, self-check questions, and a lab to manipulate qubits directly."),
        h("div", { class: "hero-cta" }, [
          h("a", {
            class: "btn primary", href: next ? ("#/l/" + next.mod.id + "/" + next.lesson.id) : "#/"
          }, dc > 0 ? t("resume") : t("start")),
          h("a", { class: "btn ghost", href: "#/lab" }, t("navLab"))
        ])
      ])
    ]);
    el.appendChild(hero);

    // progress banner
    el.appendChild(h("section", { class: "banner" }, [
      h("div", { class: "wrap banner-grid" }, [
        h("div", {}, [
          h("p", { class: "banner-label" }, t("yourProgress")),
          h("p", { class: "banner-stats" }, [
            h("strong", {}, String(dc)), " " + t("of") + " " + tot + " " + t("lessons"),
            h("span", { class: "dot" }, "·"),
            h("strong", {}, String(state.streak || 1)), " " + t("streak")
          ]),
          progressBar(pct)
        ]),
        h("a", { class: "btn small", href: next ? ("#/l/" + next.mod.id + "/" + next.lesson.id) : "#/lab" },
          next ? t("continueLearning") : t("navLab"))
      ])
    ]));

    // module map
    var map = h("section", { class: "wrap section" }, [
      h("h2", { class: "section-h" }, t("courseOverview")),
      h("p", { class: "section-lede" }, t("overviewLede"))
    ]);
    var grid = h("div", { class: "module-grid" });
    MODULES.forEach(function (m) {
      var md = moduleDone(m), ml = (m.lessons || []).length;
      var card = h("a", { class: "module-card", href: "#/m/" + m.id, style: m.accent ? ("--accent:" + m.accent) : "" }, [
        h("div", { class: "mc-top" }, [
          h("span", { class: "mc-num" }, t("module") + " " + (m.order)),
          h("span", { class: "mc-count" }, md + "/" + ml + " " + t("moduleProgress"))
        ]),
        h("h3", { class: "mc-title" }, loc(m.title)),
        h("p", { class: "mc-sub" }, loc(m.subtitle)),
        progressBar(ml ? Math.round(md / ml * 100) : 0, true)
      ]);
      grid.appendChild(card);
    });
    map.appendChild(grid);
    el.appendChild(map);

    renderMath(el);
    startHeroCanvas();
  }

  function progressBar(pct, mini) {
    return h("div", { class: "pbar" + (mini ? " mini" : ""), role: "progressbar", "aria-valuenow": pct, "aria-valuemin": 0, "aria-valuemax": 100 }, [
      h("div", { class: "pbar-fill", style: "width:" + pct + "%" })
    ]);
  }

  function viewModule(modId) {
    var m = MODULES.filter(function (x) { return x.id === modId; })[0];
    var el = app(); el.innerHTML = "";
    if (!m) { el.appendChild(h("div", { class: "wrap section" }, t("notFound"))); return; }
    el.appendChild(h("section", { class: "wrap section module-head", style: m.accent ? ("--accent:" + m.accent) : "" }, [
      h("p", { class: "eyebrow accent" }, t("module") + " " + m.order),
      h("h1", { class: "module-h1" }, loc(m.title)),
      h("p", { class: "lede" }, loc(m.subtitle)),
      progressBar((m.lessons || []).length ? Math.round(moduleDone(m) / m.lessons.length * 100) : 0)
    ]));
    var list = h("ol", { class: "lesson-list wrap" });
    (m.lessons || []).forEach(function (l, i) {
      list.appendChild(h("li", {}, [
        h("a", { class: "lesson-row" + (isDone(l.id) ? " done" : ""), href: "#/l/" + m.id + "/" + l.id }, [
          h("span", { class: "lr-check", "aria-hidden": "true" }, isDone(l.id) ? "✓" : String(i + 1)),
          h("span", { class: "lr-body" }, [
            h("span", { class: "lr-title" }, loc(l.title)),
            h("span", { class: "lr-meta" }, (l.minutes ? l.minutes + " " + t("minutes") + " " + t("estRead") : "") + (l.quiz && l.quiz.length ? "  ·  " + l.quiz.length + " Q" : ""))
          ]),
          h("span", { class: "lr-arrow", "aria-hidden": "true" }, "→")
        ])
      ]));
    });
    el.appendChild(list);
    renderMath(el);
  }

  function viewLesson(modId, lessonId) {
    var entry = lessonIndex[lessonId];
    var el = app(); el.innerHTML = "";
    if (!entry) { el.appendChild(h("div", { class: "wrap section" }, t("notFound"))); return; }
    var m = entry.mod, l = entry.lesson;

    var layout = h("div", { class: "lesson-layout wrap", style: m.accent ? ("--accent:" + m.accent) : "" });
    // sidebar
    var side = h("aside", { class: "lesson-side" }, [
      h("a", { class: "side-back", href: "#/m/" + m.id }, "← " + loc(m.title))
    ]);
    var sideList = h("ol", { class: "side-list" });
    (m.lessons || []).forEach(function (ll) {
      sideList.appendChild(h("li", {}, h("a", {
        class: "side-link" + (ll.id === l.id ? " current" : "") + (isDone(ll.id) ? " done" : ""),
        href: "#/l/" + m.id + "/" + ll.id
      }, [h("span", { class: "sl-dot", "aria-hidden": "true" }, isDone(ll.id) ? "✓" : ""), loc(ll.title)])));
    });
    side.appendChild(sideList);

    // article
    var art = h("article", { class: "lesson-article" }, [
      h("p", { class: "eyebrow accent" }, loc(m.title) + "  ·  " + t("module") + " " + m.order),
      h("h1", { class: "lesson-h1" }, loc(l.title)),
      h("div", { class: "lesson-body", id: "lesson-body" }, h("p", { class: "loading" }, "…"))
    ]);

    layout.appendChild(side);
    layout.appendChild(art);
    el.appendChild(layout);

    // fetch fragment for current lang, fall back to en
    var body = art.querySelector("#lesson-body");
    fetchLesson(m.id, l.id, state.lang).then(function (html) {
      body.innerHTML = html;
      renderMath(body);
      // quiz
      if (l.quiz && l.quiz.length) body.appendChild(buildQuiz(l.quiz));
      // complete + nav
      art.appendChild(lessonFooter(entry));
      renderMath(art);
      // scroll to top of article
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }).catch(function () {
      body.innerHTML = "";
      body.appendChild(h("p", { class: "loading" }, t("notFound")));
      art.appendChild(lessonFooter(entry));
    });
  }

  var fragCache = {};
  function fetchLesson(modId, lessonId, lang) {
    var url = "content/" + modId + "/" + lessonId + "." + lang + ".html";
    if (fragCache[url]) return Promise.resolve(fragCache[url]);
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error("404");
      return r.text();
    }).then(function (txt) { fragCache[url] = txt; return txt; })
      .catch(function () {
        if (lang !== "en") return fetchLesson(modId, lessonId, "en");
        throw new Error("missing");
      });
  }

  function lessonFooter(entry) {
    var l = entry.lesson;
    var prev = entry.flatIndex > 0 ? flatLessons[entry.flatIndex - 1] : null;
    var nxt = entry.flatIndex < flatLessons.length - 1 ? flatLessons[entry.flatIndex + 1] : null;

    var doneBtn = h("button", {
      class: "btn done-btn" + (isDone(l.id) ? " is-done" : " primary"),
      type: "button",
      "aria-pressed": isDone(l.id) ? "true" : "false",
      onclick: function () {
        setDone(l.id, !isDone(l.id));
        rerender();
      }
    }, isDone(l.id) ? ("✓ " + t("done")) : t("markDone"));

    var nav = h("div", { class: "lesson-nav" }, [
      prev ? h("a", { class: "ln-btn prev", href: "#/l/" + prev.mod.id + "/" + prev.lesson.id }, [
        h("span", { class: "ln-dir" }, "← " + t("prev")), h("span", { class: "ln-name" }, loc(prev.lesson.title))
      ]) : h("span", {}),
      nxt ? h("a", { class: "ln-btn next", href: "#/l/" + nxt.mod.id + "/" + nxt.lesson.id }, [
        h("span", { class: "ln-dir" }, t("next") + " →"), h("span", { class: "ln-name" }, loc(nxt.lesson.title))
      ]) : h("a", { class: "ln-btn next", href: "#/lab" }, [
        h("span", { class: "ln-dir" }, t("navLab") + " →"), h("span", { class: "ln-name" }, "")
      ])
    ]);

    return h("footer", { class: "lesson-foot" }, [h("div", { class: "done-wrap" }, doneBtn), nav]);
  }

  /* ---------- quiz ---------- */
  function buildQuiz(quiz) {
    var wrap = h("section", { class: "quiz" }, [
      h("h2", { class: "quiz-h" }, t("checkYourself")),
      h("p", { class: "quiz-lede" }, t("tryAll"))
    ]);
    quiz.forEach(function (q, qi) {
      var picked = { i: null };
      var optWrap = h("div", { class: "q-opts", role: "radiogroup", "aria-label": loc(q.q) });
      var feedback = h("div", { class: "q-feedback", "aria-live": "polite" });
      var opts = q.options.map(function (o, oi) {
        var b = h("button", {
          type: "button", class: "q-opt", role: "radio", "aria-checked": "false",
          onclick: function () {
            picked.i = oi;
            opts.forEach(function (bb, bi) { bb.classList.toggle("picked", bi === oi); bb.setAttribute("aria-checked", bi === oi ? "true" : "false"); });
            feedback.className = "q-feedback";
            feedback.innerHTML = "";
          }
        }, [h("span", { class: "q-mark", "aria-hidden": "true" }, String.fromCharCode(65 + oi)), h("span", { class: "q-text" }, loc(o))]);
        renderMath(b);
        optWrap.appendChild(b);
        return b;
      });
      var submit = h("button", {
        class: "btn small q-submit", type: "button",
        onclick: function () {
          if (picked.i == null) return;
          var right = picked.i === q.answer;
          opts.forEach(function (bb, bi) {
            bb.classList.remove("correct", "wrong");
            if (bi === q.answer) bb.classList.add("correct");
            else if (bi === picked.i) bb.classList.add("wrong");
          });
          feedback.className = "q-feedback show " + (right ? "good" : "bad");
          feedback.innerHTML = "<strong>" + (right ? t("correct") : t("incorrect")) + ".</strong> " + loc(q.explain);
          renderMath(feedback);
        }
      }, t("submit"));

      wrap.appendChild(h("div", { class: "q-card" }, [
        h("p", { class: "q-q" }, loc(q.q)),
        optWrap, submit, feedback
      ]));
    });
    renderMath(wrap);
    return wrap;
  }

  /* ---------- hero canvas ---------- */
  function startHeroCanvas() {
    var canvas = document.getElementById("hero-canvas");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var pts = [], raf = null;
    var COLORS = ["rgba(76,201,240,0.6)", "rgba(129,90,214,0.55)", "rgba(246,196,69,0.55)"];
    function resize() {
      var r = canvas.parentElement.getBoundingClientRect();
      canvas.width = r.width * dpr; canvas.height = r.height * dpr;
      canvas.style.width = r.width + "px"; canvas.style.height = r.height + "px";
      var n = Math.max(16, Math.round(r.width * r.height / 28000));
      pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * r.width, y: Math.random() * r.height, r: 1 + Math.random() * 1.8, ph: Math.random() * 6.28, sp: 0.15 + Math.random() * 0.25, c: COLORS[i % 3] });
    }
    function frame(ts) {
      var w = canvas.width / dpr, hgt = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, hgt);
      var tm = reduceMotion ? 0 : (ts || 0) / 1000;
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i], py = p.y + Math.sin(tm * p.sp + p.ph) * 12;
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], qy = q.y + Math.sin(tm * q.sp + q.ph) * 12;
          var dx = p.x - q.x, dy = py - qy, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) { ctx.strokeStyle = "rgba(130,120,190," + (0.12 * (1 - d / 120)) + ")"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, py); ctx.lineTo(q.x, qy); ctx.stroke(); }
        }
      }
      for (var k = 0; k < pts.length; k++) { var pt = pts[k], y2 = pt.y + Math.sin(tm * pt.sp + pt.ph) * 12; ctx.beginPath(); ctx.fillStyle = pt.c; ctx.arc(pt.x, y2, pt.r, 0, 6.2832); ctx.fill(); }
      if (!reduceMotion) raf = requestAnimationFrame(frame);
    }
    resize(); frame(0);
    var onResize = function () { resize(); };
    window.addEventListener("resize", onResize);
  }

  /* ---------- router ---------- */
  function currentRoute() {
    var hash = location.hash || "#/";
    var parts = hash.replace(/^#\//, "").split("/").filter(Boolean);
    return parts;
  }
  function route() {
    var p = currentRoute();
    renderChrome();
    if (p.length === 0) return viewHome();
    if (p[0] === "lab") return (window.QP_LAB ? window.QP_LAB.render(app(), { state: state, t: t, loc: loc, h: h, renderMath: renderMath }) : viewHome());
    if (p[0] === "about") return viewAbout();
    if (p[0] === "m" && p[1]) return viewModule(p[1]);
    if (p[0] === "l" && p[1] && p[2]) return viewLesson(p[1], p[2]);
    return viewHome();
  }
  function rerender() { route(); }

  function viewAbout() {
    var el = app(); el.innerHTML = "";
    var vi = state.lang === "vi";
    el.appendChild(h("section", { class: "wrap section prose-page" }, [
      h("h1", { class: "section-h" }, vi ? "Về Quantum Path" : "About Quantum Path"),
      h("p", {}, vi
        ? "Quantum Path là một khoá học mở, tự học, song ngữ về điện toán lượng tử. Mục tiêu không phải lướt qua khái niệm mà là thực sự hiểu: mỗi bài có toán học đầy đủ, ví dụ có lời giải, và câu hỏi tự kiểm tra."
        : "Quantum Path is an open, self-paced, bilingual course on quantum computing. The goal is not to skim concepts but to genuinely understand: every lesson carries full mathematics, worked examples, and self-check questions."),
      h("p", {}, vi
        ? "Nội dung bám theo trình tự chuẩn của các giáo trình kinh điển (Nielsen & Chuang, giáo trình Qiskit, khoá của John Preskill) nhưng viết lại cho người tự học, không cần nền vật lý."
        : "The content follows the standard arc of the classic references (Nielsen & Chuang, the Qiskit textbook, John Preskill's lecture notes) but is rewritten for a self-learner with no physics background."),
      h("h2", {}, vi ? "Nguồn tham khảo chính" : "Primary references"),
      h("ul", { class: "ref-list" }, [
        h("li", {}, "Nielsen & Chuang, Quantum Computation and Quantum Information"),
        h("li", {}, "IBM Qiskit Textbook / Basics of Quantum Information"),
        h("li", {}, "John Preskill, Ph219 Quantum Computation lecture notes (Caltech)"),
        h("li", {}, "Andy Matuschak & Michael Nielsen, Quantum Country"),
        h("li", {}, "Scott Aaronson, Quantum Computing Since Democritus")
      ]),
      h("p", { class: "fine" }, vi
        ? "Đây là tài liệu học tập; mọi công thức đã được đối chiếu nhưng nếu bạn phát hiện sai sót, đó là cơ hội tốt để kiểm chứng lại bằng nguồn gốc."
        : "This is a study resource; formulas are cross-checked, but if you spot an error, treat it as a good prompt to verify against the primary source.")
    ]));
    renderMath(el);
  }

  /* ---------- boot ---------- */
  function boot() {
    buildIndex();
    window.addEventListener("hashchange", route);
    route();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  // expose a couple helpers for the lab module
  QP._internal = { state: state, save: save, t: t, loc: loc, h: h, renderMath: renderMath };
})();
