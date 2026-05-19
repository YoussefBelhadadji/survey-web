# Sanctuary Web App

## Project Structure

```
src/
├── constants/        # Static data (languages, onboarding slides)
├── styles/           # Global CSS + design tokens
├── components/       # Reusable UI components
├── pages/            # Full screens
│   ├── SplashScreen.jsx
│   ├── LanguageSelector.jsx
│   ├── Onboarding.jsx
│   └── Home.jsx
├── App.jsx           # Router / screen manager
└── main.jsx          # Entry point
```

## Setup

```bash
npm create vite@latest sanctuary-app -- --template react
cd sanctuary-app
# Replace src/ with the provided files
npm install
npm run dev
```
