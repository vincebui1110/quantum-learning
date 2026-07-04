/* Validation harness for Quantum Path content.
   Loads every content/<mod>/module.js, then checks that each declared
   lesson has both .en.html and .vi.html, quizzes are well-formed, and
   fragments are tag-balanced. Run: node tools/validate.js  (from repo root) */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const CONTENT = path.join(ROOT, "content");

const modules = [];
const QP = { registerModule: (m) => modules.push(m) };
const sandbox = { QP };
vm.createContext(sandbox);

let hardErrors = 0, warnings = 0;
function err(msg) { console.log("  ERROR  " + msg); hardErrors++; }
function warn(msg) { console.log("  warn   " + msg); warnings++; }

// load modules
const dirs = fs.readdirSync(CONTENT).filter(d => fs.statSync(path.join(CONTENT, d)).isDirectory());
for (const d of dirs) {
  const mf = path.join(CONTENT, d, "module.js");
  if (!fs.existsSync(mf)) { err(`${d}/module.js missing`); continue; }
  try { vm.runInContext(fs.readFileSync(mf, "utf8"), sandbox, { filename: mf }); }
  catch (e) { err(`${d}/module.js threw: ${e.message}`); }
}

modules.sort((a, b) => a.order - b.order);
console.log(`\nLoaded ${modules.length} modules, ${modules.reduce((n, m) => n + (m.lessons || []).length, 0)} lessons.\n`);

function checkBalance(html, label) {
  // crude tag-balance check ignoring void/self-closing
  const voids = new Set(["br", "hr", "img", "input", "meta", "link", "col", "area", "source", "wbr"]);
  const stack = [];
  const re = /<(\/?)([a-zA-Z0-9]+)(\s[^>]*?)?(\/?)>/g;
  let m;
  while ((m = re.exec(html))) {
    const closing = m[1] === "/", tag = m[2].toLowerCase(), self = m[4] === "/";
    if (voids.has(tag) || self) continue;
    if (!closing) stack.push(tag);
    else {
      if (!stack.length) { warn(`${label}: extra </${tag}>`); return; }
      const top = stack.pop();
      if (top !== tag) { warn(`${label}: expected </${top}> got </${tag}>`); return; }
    }
  }
  if (stack.length) warn(`${label}: unclosed <${stack.join(",")}>`);
}

const idRe = /^[a-z0-9-]+$/;
for (const m of modules) {
  const dir = path.join(CONTENT, m.id);
  if (!m.title || !m.title.en || !m.title.vi) err(`${m.id}: missing bilingual title`);
  if (!m.subtitle || !m.subtitle.en || !m.subtitle.vi) err(`${m.id}: missing bilingual subtitle`);
  if (!Array.isArray(m.lessons) || !m.lessons.length) { err(`${m.id}: no lessons`); continue; }
  for (const l of m.lessons) {
    if (!l.id || !idRe.test(l.id)) err(`${m.id}: bad lesson id '${l.id}'`);
    if (!l.title || !l.title.en || !l.title.vi) err(`${m.id}/${l.id}: missing bilingual title`);
    for (const lang of ["en", "vi"]) {
      const f = path.join(dir, `${l.id}.${lang}.html`);
      if (!fs.existsSync(f)) { err(`${m.id}/${l.id}: missing ${lang} fragment`); continue; }
      const html = fs.readFileSync(f, "utf8");
      if (html.trim().length < 200) warn(`${m.id}/${l.id}.${lang}: very short (${html.trim().length} chars)`);
      if (/<\/?(html|head|body)\b/i.test(html)) warn(`${m.id}/${l.id}.${lang}: contains html/head/body wrapper`);
      if (!/takeaways/.test(html)) warn(`${m.id}/${l.id}.${lang}: no takeaways block`);
      checkBalance(html, `${m.id}/${l.id}.${lang}`);
    }
    if (l.quiz) {
      l.quiz.forEach((q, i) => {
        if (!q.q || !q.q.en || !q.q.vi) err(`${m.id}/${l.id} quiz#${i}: missing bilingual question`);
        if (!Array.isArray(q.options) || q.options.length < 2) err(`${m.id}/${l.id} quiz#${i}: <2 options`);
        else q.options.forEach((o, oi) => { if (!o.en || !o.vi) err(`${m.id}/${l.id} quiz#${i} opt#${oi}: not bilingual`); });
        if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= (q.options || []).length) err(`${m.id}/${l.id} quiz#${i}: answer index out of range`);
        if (!q.explain || !q.explain.en || !q.explain.vi) err(`${m.id}/${l.id} quiz#${i}: missing bilingual explanation`);
      });
    }
  }
  console.log(`  ok     ${m.id}  (order ${m.order}, ${m.lessons.length} lessons)`);
}

console.log(`\n${hardErrors} errors, ${warnings} warnings.`);
process.exit(hardErrors ? 1 : 0);
