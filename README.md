# Quantum Path

An open, self-paced, **bilingual (English / Tiếng Việt)** course on quantum computing - from the underlying mathematics to the algorithms, hardware, and an interactive practice lab.

Live: **https://vincebui1110.github.io/quantum-learning/**

## What it is

A dependency-free static site (plain HTML/CSS/JS, no build step). Real mathematics is typeset with a **vendored copy of KaTeX** (no CDN, works offline). Progress - completed lessons and a day-streak - is saved to `localStorage` on the visitor's own device.

### Curriculum - 8 modules, 38 lessons

1. **Foundations** - why quantum computing exists, and the math you actually need (complex numbers, vectors/kets, probability, matrices).
2. **The Qubit** - state vectors, amplitudes, measurement & the Born rule, phase, the Bloch sphere.
3. **Single-qubit gates** - unitary matrices, Pauli gates, Hadamard, phase gates, rotations, composing circuits.
4. **Multi-qubit systems** - the tensor product, CNOT/CZ/SWAP, entanglement & Bell states, GHZ, no-cloning.
5. **Quantum protocols** - Bell inequalities (CHSH), superdense coding, teleportation, BB84 key distribution.
6. **Quantum algorithms I** - oracles & phase kickback, Deutsch-Jozsa, Bernstein-Vazirani, the QFT, phase estimation.
7. **Quantum algorithms II** - Grover's search, amplitude amplification, Shor's factoring, and what speed-ups (BQP) really mean.
8. **Hardware & the frontier** - physical qubits, decoherence, error correction & the surface code, NISQ/VQE/QAOA, fault tolerance.

Every lesson has full mathematics, worked examples, callouts, and a self-check quiz - in both languages.

### Practice Lab

- **Single-qubit playground** - apply X/Y/Z/H/S/T, watch the state move on a live Bloch sphere, read amplitudes and measurement probabilities, and measure to collapse.
- **Two-qubit circuit simulator** - build circuits with H/X/Z/CNOT/CZ/SWAP, create a Bell pair, measure, and see live entanglement detection.

Both compute the real linear algebra in the browser - nothing is pre-recorded.

## Structure

```
index.html                     # shell: loads KaTeX, engine, lab, and content modules
assets/
  app.js                       # SPA engine: hash router, EN/VI i18n, progress, quiz, KaTeX
  lab.js                       # interactive simulators
  styles.css                   # theme (light/dark), layout, typography
  vendor/katex/                # vendored KaTeX (js/css/woff2 fonts)
content/<module>/
  module.js                    # self-registers the module (metadata + quizzes)
  <lesson>.en.html             # lesson body fragment (English)
  <lesson>.vi.html             # lesson body fragment (Vietnamese)
tools/validate.js              # content validator (fragments exist, quizzes well-formed, tags balanced)
```

Content sources referenced while writing: Nielsen & Chuang, the IBM Qiskit textbook, John Preskill's lecture notes, and standard references (see the in-app *About* page).

## Running locally

Because lessons are fetched fragments, use a static server (not `file://`):

```
python3 -m http.server 8000     # then open http://localhost:8000
node tools/validate.js          # sanity-check all content
```

## Hosting

Deployed via GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).
