# OpenAPI → Redoc (build autonome)

Ce mini outillage te permet de (1) valider, (2) bundler et (3) générer un HTML autonome Redoc à partir de `openapi.yaml`.

## Prérequis
- Node.js 18+
- Ton fichier `openapi.yaml` à la racine du projet

## Installation
```bash
npm install
```

## Commandes
- **Lint** (valide la spec) :
  ```bash
  npm run lint
  ```
- **Bundle** (optionnel, fusionne les $ref) :
  ```bash
  npm run bundle
  # génère openapi.bundle.yaml
  ```
- **Build** (génère le HTML autonome) :
  ```bash
  npm run build
  # sortie : dist/index.html
  ```
- **Serveur local** :
  ```bash
  npm run serve
  # ouvre http://localhost:8080
  ```

> Astuce : si tu utilises des `$ref` locaux ou distants, `npm run bundle` avant `build` aide Redoc à tout résoudre.

## CI/CD (GitHub Pages)
Un workflow est fourni dans `.github/workflows/deploy.yml`.
- Il build la doc et la publie sur GitHub Pages (branche `gh-pages` interne à Pages).
- Active **Pages** dans *Settings → Pages* et choisis "GitHub Actions".

## Structure attendue
```
/ (racine)
├── openapi.yaml
├── package.json
├── dist/              # sortie du build
└── .github/workflows/deploy.yml
```
