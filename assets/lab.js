/* ============================================================
   Quantum Path - Practice Lab
   Vanilla-JS interactive simulators:
   1) Single-qubit gate playground with a live Bloch sphere
   2) Two-qubit circuit simulator (amplitudes + measurement)
   Exposes window.QP_LAB.render(container, ctx)
   ctx = { state, t, loc, h, renderMath }
   ============================================================ */
(function () {
  "use strict";

  /* ---------- complex helpers ---------- */
  function C(re, im) { return { re: re, im: im || 0 }; }
  function cadd(a, b) { return C(a.re + b.re, a.im + b.im); }
  function csub(a, b) { return C(a.re - b.re, a.im - b.im); }
  function cmul(a, b) { return C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re); }
  function cscale(a, s) { return C(a.re * s, a.im * s); }
  function cconj(a) { return C(a.re, -a.im); }
  function cabs2(a) { return a.re * a.re + a.im * a.im; }
  var SQRT1_2 = Math.SQRT1_2;
  var Ei_pi4 = C(Math.cos(Math.PI / 4), Math.sin(Math.PI / 4)); // e^{iπ/4}

  function fmtC(a) {
    var r = Math.abs(a.re) < 1e-9 ? 0 : a.re;
    var i = Math.abs(a.im) < 1e-9 ? 0 : a.im;
    function n(x) { return (Math.round(x * 1000) / 1000).toString(); }
    if (i === 0) return n(r);
    if (r === 0) return n(i) + "i";
    return n(r) + (i > 0 ? " + " : " - ") + n(Math.abs(i)) + "i";
  }

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.QP_LAB = {
    render: function (container, ctx) {
      var lang = ctx.state.lang;
      var h = ctx.h, renderMath = ctx.renderMath;
      function L(en, vi) { return lang === "vi" ? vi : en; }

      container.innerHTML = "";
      var root = h("div", { class: "wrap section lab-head" }, [
        h("p", { class: "eyebrow accent" }, L("Practice Lab", "Phòng thực hành")),
        h("h1", { class: "section-h" }, L("Manipulate qubits with your own hands", "Tự tay thao tác với qubit")),
        h("p", { class: "section-lede" }, L(
          "Reading is not enough. Apply gates, watch the state move on the Bloch sphere, read the amplitudes, and measure to see the Born rule in action. Nothing here is a recording - it computes the real linear algebra live.",
          "Chỉ đọc là chưa đủ. Áp dụng cổng, quan sát trạng thái dịch chuyển trên mặt cầu Bloch, đọc biên độ, và đo để thấy quy tắc Born hoạt động. Không có gì ở đây là quay sẵn - nó tính đại số tuyến tính thật theo thời gian thực."
        ))
      ]);
      container.appendChild(root);

      var grid = h("div", { class: "wrap lab-grid" });
      container.appendChild(grid);
      grid.appendChild(buildSingle(h, L, renderMath));
      grid.appendChild(buildTwo(h, L, renderMath));

      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  /* ============================================================
     Single-qubit playground
     ============================================================ */
  function buildSingle(h, L, renderMath) {
    // state amplitudes
    var a0 = C(1, 0), a1 = C(0, 0);
    var history = [];

    var GATES = {
      X: function () { var t = a0; a0 = a1; a1 = t; },
      Y: function () { var na0 = cmul(C(0, -1), a1); var na1 = cmul(C(0, 1), a0); a0 = na0; a1 = na1; },
      Z: function () { a1 = cscale(a1, -1); },
      H: function () { var na0 = cscale(cadd(a0, a1), SQRT1_2); var na1 = cscale(csub(a0, a1), SQRT1_2); a0 = na0; a1 = na1; },
      S: function () { a1 = cmul(C(0, 1), a1); },
      T: function () { a1 = cmul(Ei_pi4, a1); }
    };

    var readout = h("div", { class: "state-readout" });
    var probWrap = h("div", { class: "prob-bars" });
    var tape = h("div", { class: "history-tape" });
    var measureOut = h("div", { class: "measure-out" });
    var canvas = h("canvas", { class: "bloch-canvas", "aria-label": "Bloch sphere showing the current qubit state" });

    function reset() { a0 = C(1, 0); a1 = C(0, 0); history = []; measureOut.innerHTML = ""; update(); }
    function applyGate(name) { GATES[name](); history.push(name); measureOut.innerHTML = ""; update(); }
    function measure() {
      var p0 = cabs2(a0);
      var r = Math.random();
      var out = r < p0 ? 0 : 1;
      if (out === 0) { a0 = C(1, 0); a1 = C(0, 0); } else { a0 = C(0, 0); a1 = C(1, 0); }
      measureOut.innerHTML = "<strong>" + L("Measured: ", "Đo được: ") + out + "</strong> " +
        L("(state collapsed to |" + out + "⟩)", "(trạng thái sập về |" + out + "⟩)");
      update();
    }

    function blochCoords() {
      // x=2Re(conj(a0)a1), y=2Im(conj(a0)a1), z=|a0|^2-|a1|^2
      var p = cmul(cconj(a0), a1);
      return { x: 2 * p.re, y: 2 * p.im, z: cabs2(a0) - cabs2(a1) };
    }

    function update() {
      var p0 = cabs2(a0), p1 = cabs2(a1);
      readout.innerHTML = "";
      readout.appendChild(h("div", { class: "row" }, [h("span", {}, "|ψ⟩ ="), h("span", { class: "amp" }, "(" + fmtC(a0) + ")|0⟩ + (" + fmtC(a1) + ")|1⟩")]));
      var b = blochCoords();
      readout.appendChild(h("div", { class: "row" }, [h("span", {}, "Bloch (x,y,z)"),
        h("span", { class: "amp" }, "(" + round2(b.x) + ", " + round2(b.y) + ", " + round2(b.z) + ")")]));

      probWrap.innerHTML = "";
      probWrap.appendChild(probBar("P(0)", p0));
      probWrap.appendChild(probBar("P(1)", p1));

      tape.textContent = history.length ? (L("Applied: ", "Đã áp dụng: ") + history.join(" · ")) : L("No gates applied yet - state is |0⟩.", "Chưa áp dụng cổng nào - trạng thái là |0⟩.");
      drawBloch(canvas, b);
    }

    function probBar(label, p) {
      return h("div", { class: "prob-bar" }, [
        h("span", {}, label),
        h("span", { class: "prob-track" }, h("span", { class: "prob-val", style: "width:" + (p * 100).toFixed(1) + "%" })),
        h("span", {}, (p * 100).toFixed(1) + "%")
      ]);
    }

    var gateRow = h("div", { class: "gate-row" });
    ["X", "Y", "Z", "H", "S", "T"].forEach(function (g) {
      gateRow.appendChild(h("button", { class: "gate-btn", type: "button", onclick: function () { applyGate(g); } }, g));
    });
    gateRow.appendChild(h("button", { class: "gate-btn", type: "button", onclick: measure }, L("Measure", "Đo")));
    gateRow.appendChild(h("button", { class: "gate-btn reset", type: "button", onclick: reset }, L("Reset", "Đặt lại")));

    var panel = h("section", { class: "lab-panel" }, [
      h("h2", {}, L("Single-qubit playground", "Sân chơi một qubit")),
      h("p", { class: "panel-sub" }, L(
        "Start at |0⟩. Click gates to transform the state; the Bloch sphere and probabilities update instantly. Try H then H (you return to |0⟩), or H then Z then H (you reach |1⟩ - interference at work).",
        "Bắt đầu ở |0⟩. Bấm các cổng để biến đổi trạng thái; mặt cầu Bloch và xác suất cập nhật tức thì. Thử H rồi H (bạn về |0⟩), hoặc H rồi Z rồi H (bạn tới |1⟩ - giao thoa đang hoạt động)."
      )),
      h("div", { class: "lab-two" }, [
        h("div", {}, [gateRow, readout, probWrap, tape, measureOut]),
        h("div", { class: "bloch-wrap" }, canvas)
      ])
    ]);

    // initial draw (canvas needs to be in DOM for sizing; defer)
    setTimeout(update, 0);
    return panel;
  }

  function round2(x) { return (Math.round(x * 100) / 100).toString(); }

  /* ---------- Bloch sphere drawing ---------- */
  function drawBloch(canvas, v) {
    var ctx = canvas.getContext && canvas.getContext("2d");
    if (!ctx) return;
    var rect = canvas.getBoundingClientRect();
    var size = Math.max(200, Math.min(rect.width || 260, 320));
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr; canvas.height = size * dpr;
    canvas.style.height = size + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    var cx = size / 2, cy = size / 2, R = size * 0.36;
    var css = getComputedStyle(document.documentElement);
    var accent = (css.getPropertyValue("--violet") || "#6B34D4").trim();
    var faint = (css.getPropertyValue("--text-faint") || "#888").trim();
    var soft = (css.getPropertyValue("--text-soft") || "#666").trim();

    var yaw = -0.62, tilt = 0.42;
    function proj(x, y, z) {
      var px = x * Math.cos(yaw) + y * Math.sin(yaw);
      var py = y * Math.cos(yaw) - x * Math.sin(yaw);
      var sx = px;
      var sy = -z * Math.cos(tilt) + py * Math.sin(tilt);
      return [cx + sx * R, cy + sy * R, py]; // py = depth
    }

    // sphere silhouette
    ctx.strokeStyle = faint; ctx.globalAlpha = 0.5; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.stroke();
    ctx.globalAlpha = 1;

    // equator + a meridian (project unit circle)
    function ring(fn, alpha) {
      ctx.strokeStyle = faint; ctx.globalAlpha = alpha; ctx.lineWidth = 1; ctx.beginPath();
      for (var i = 0; i <= 60; i++) {
        var a = i / 60 * 6.2832; var p = fn(a);
        var s = proj(p[0], p[1], p[2]);
        if (i === 0) ctx.moveTo(s[0], s[1]); else ctx.lineTo(s[0], s[1]);
      }
      ctx.stroke(); ctx.globalAlpha = 1;
    }
    ring(function (a) { return [Math.cos(a), Math.sin(a), 0]; }, 0.45);          // equator
    ring(function (a) { return [Math.cos(a), 0, Math.sin(a)]; }, 0.25);          // meridian xz
    ring(function (a) { return [0, Math.cos(a), Math.sin(a)]; }, 0.25);          // meridian yz

    // axes
    function axis(x, y, z, label, col) {
      var s = proj(x, y, z); var o = proj(0, 0, 0);
      ctx.strokeStyle = col; ctx.globalAlpha = 0.55; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(o[0], o[1]); ctx.lineTo(s[0], s[1]); ctx.stroke();
      ctx.globalAlpha = 1; ctx.fillStyle = soft; ctx.font = "12px ui-monospace, monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      var lx = proj(x * 1.16, y * 1.16, z * 1.16);
      ctx.fillText(label, lx[0], lx[1]);
    }
    axis(0, 0, 1, "|0⟩", faint);
    axis(0, 0, -1, "|1⟩", faint);
    axis(1, 0, 0, "x", faint);
    axis(0, 1, 0, "y", faint);

    // state vector
    var sv = proj(v.x, v.y, v.z);
    var o = proj(0, 0, 0);
    ctx.strokeStyle = accent; ctx.lineWidth = 2.5; ctx.beginPath();
    ctx.moveTo(o[0], o[1]); ctx.lineTo(sv[0], sv[1]); ctx.stroke();
    ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(sv[0], sv[1], 5, 0, 6.2832); ctx.fill();
  }

  /* ============================================================
     Two-qubit circuit simulator
     basis order: index 0..3 = |00>,|01>,|10>,|11>
     qubit 0 = high bit (i>>1), qubit 1 = low bit (i&1)
     ============================================================ */
  function buildTwo(h, L, renderMath) {
    var st = [C(1, 0), C(0, 0), C(0, 0), C(0, 0)];
    var log = [];

    function applySingle(U, q) {
      // U is [[u00,u01],[u10,u11]] complex; q=0 high, q=1 low
      var ns = st.slice();
      for (var i = 0; i < 4; i++) {
        var bit = q === 0 ? (i >> 1) & 1 : i & 1;
        if (bit === 0) {
          var j = q === 0 ? (i | 2) : (i | 1); // partner with target bit =1
          var x0 = st[i], x1 = st[j];
          ns[i] = cadd(cmul(U[0][0], x0), cmul(U[0][1], x1));
          ns[j] = cadd(cmul(U[1][0], x0), cmul(U[1][1], x1));
        }
      }
      st = ns;
    }
    function cnot(c, tq) {
      var ns = st.slice();
      for (var i = 0; i < 4; i++) {
        var cb = c === 0 ? (i >> 1) & 1 : i & 1;
        if (cb === 1) {
          var flip = tq === 0 ? (i ^ 2) : (i ^ 1);
          ns[flip] = st[i];
        }
      }
      st = ns;
    }
    function cz() { st[3] = cscale(st[3], -1); }
    function swap() { var t = st[1]; st[1] = st[2]; st[2] = t; }

    var Hm = [[C(SQRT1_2), C(SQRT1_2)], [C(SQRT1_2), C(-SQRT1_2)]];
    var Xm = [[C(0), C(1)], [C(1), C(0)]];
    var Zm = [[C(1), C(0)], [C(0), C(-1)]];

    var readout = h("div", { class: "state-readout" });
    var probWrap = h("div", { class: "prob-bars" });
    var logEl = h("div", { class: "circuit-log" });
    var measureOut = h("div", { class: "measure-out" });
    var entEl = h("div", { class: "measure-out" });

    function reset() { st = [C(1, 0), C(0, 0), C(0, 0), C(0, 0)]; log = []; measureOut.innerHTML = ""; update(); }
    function act(name, fn) { fn(); log.push(name); measureOut.innerHTML = ""; update(); }
    function bell() { reset(); applySingle(Hm, 0); log.push("H₀"); cnot(0, 1); log.push("CNOT₀→₁"); update(); }

    function measure() {
      var probs = st.map(cabs2);
      var r = Math.random(), acc = 0, out = 3;
      for (var i = 0; i < 4; i++) { acc += probs[i]; if (r < acc) { out = i; break; } }
      st = [C(0), C(0), C(0), C(0)]; st[out] = C(1, 0);
      var label = ((out >> 1) & 1).toString() + (out & 1).toString();
      measureOut.innerHTML = "<strong>" + L("Measured: ", "Đo được: ") + "|" + label + "⟩</strong> " +
        L("(both qubits collapsed)", "(cả hai qubit đã sập)");
      update();
    }

    function isEntangled() {
      // separable pure 2-qubit state <=> a00*a11 - a01*a10 = 0 (product of complex)
      var det = csub(cmul(st[0], st[3]), cmul(st[1], st[2]));
      return Math.sqrt(cabs2(det)) > 1e-6;
    }

    function update() {
      readout.innerHTML = "";
      var labels = ["|00⟩", "|01⟩", "|10⟩", "|11⟩"];
      for (var i = 0; i < 4; i++) {
        if (Math.sqrt(cabs2(st[i])) > 1e-9) {
          readout.appendChild(h("div", { class: "row" }, [h("span", {}, labels[i]), h("span", { class: "amp" }, fmtC(st[i]))]));
        }
      }
      if (!readout.children.length) readout.appendChild(h("div", { class: "row" }, "|00⟩"));

      probWrap.innerHTML = "";
      for (var k = 0; k < 4; k++) probWrap.appendChild(twoBar(labels[k], cabs2(st[k])));

      logEl.textContent = log.length ? (L("Circuit: ", "Mạch: ") + log.join("  →  ")) : L("Empty circuit - state |00⟩.", "Mạch rỗng - trạng thái |00⟩.");
      entEl.innerHTML = isEntangled()
        ? "<strong style='color:var(--violet)'>" + L("Entangled", "Đang rối") + "</strong> — " + L("this state cannot be written as two independent qubits.", "trạng thái này không thể viết thành hai qubit độc lập.")
        : L("Separable (not entangled).", "Tách được (chưa rối).");
    }

    function twoBar(label, p) {
      return h("div", { class: "prob-bar" }, [
        h("span", {}, label),
        h("span", { class: "prob-track" }, h("span", { class: "prob-val", style: "width:" + (p * 100).toFixed(1) + "%" })),
        h("span", {}, (p * 100).toFixed(1) + "%")
      ]);
    }

    var row1 = h("div", { class: "gate-row" }, [
      gbtn(h, "H₀", function () { act("H₀", function () { applySingle(Hm, 0); }); }),
      gbtn(h, "H₁", function () { act("H₁", function () { applySingle(Hm, 1); }); }),
      gbtn(h, "X₀", function () { act("X₀", function () { applySingle(Xm, 0); }); }),
      gbtn(h, "X₁", function () { act("X₁", function () { applySingle(Xm, 1); }); }),
      gbtn(h, "Z₀", function () { act("Z₀", function () { applySingle(Zm, 0); }); }),
      gbtn(h, "Z₁", function () { act("Z₁", function () { applySingle(Zm, 1); }); })
    ]);
    var row2 = h("div", { class: "gate-row" }, [
      gbtn(h, "CNOT₀→₁", function () { act("CNOT₀→₁", function () { cnot(0, 1); }); }),
      gbtn(h, "CNOT₁→₀", function () { act("CNOT₁→₀", function () { cnot(1, 0); }); }),
      gbtn(h, "CZ", function () { act("CZ", cz); }),
      gbtn(h, "SWAP", function () { act("SWAP", swap); })
    ]);
    var row3 = h("div", { class: "gate-row" }, [
      h("button", { class: "gate-btn", type: "button", onclick: bell }, L("Make Bell pair", "Tạo cặp Bell")),
      h("button", { class: "gate-btn", type: "button", onclick: measure }, L("Measure", "Đo")),
      h("button", { class: "gate-btn reset", type: "button", onclick: reset }, L("Reset", "Đặt lại"))
    ]);

    var panel = h("section", { class: "lab-panel" }, [
      h("h2", {}, L("Two-qubit circuit simulator", "Mô phỏng mạch hai qubit")),
      h("p", { class: "panel-sub" }, L(
        "Build a circuit on two qubits and watch the four amplitudes evolve. Press “Make Bell pair” to create entanglement (H on qubit 0, then CNOT), then Measure repeatedly: you only ever see |00⟩ or |11⟩, never |01⟩ or |10⟩.",
        "Dựng một mạch trên hai qubit và xem bốn biên độ tiến hoá. Bấm “Tạo cặp Bell” để tạo rối (H lên qubit 0, rồi CNOT), sau đó Đo nhiều lần: bạn chỉ thấy |00⟩ hoặc |11⟩, không bao giờ |01⟩ hay |10⟩."
      )),
      row1, row2, row3,
      readout, probWrap, logEl, entEl, measureOut
    ]);

    setTimeout(update, 0);
    return panel;
  }

  function gbtn(h, label, fn) { return h("button", { class: "gate-btn", type: "button", onclick: fn }, label); }
})();
