# Quantum Path

A self-paced field guide to quantum analysis, from your first qubit to the frontier of fault tolerance.

Single-file static site (`index.html`, no build step, no dependencies). Three progressive levels:

- **Foundations Deck** - qubits, superposition, the double-slit experiment, the Bloch sphere.
- **Wave Lab** - entanglement, gates, interference, measurement, your first circuit.
- **Frontier Chamber** - Shor's algorithm, Grover's search, error correction, VQE, quantum supremacy, fault tolerance.

Progress (lessons marked complete, day streak) is saved to `localStorage` on the visitor's own device - no backend, no accounts.

## Running it

Just open `index.html` in a browser, or serve the folder with any static file server:

```
python3 -m http.server 8000
```

## Hosting on GitHub Pages

Settings -> Pages -> Deploy from branch -> `main` / `/ (root)`.
