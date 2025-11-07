# 🎮 Emoji Playground

Kolekcja 4 interaktywnych mini-gier z emoji stworzona w React + TypeScript + Vite!

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-latest-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-ff0055)

## 🎯 Gry

### 🌧️ Emoji Rain
Kliknij gdziekolwiek na ekranie, aby stworzyć deszcz emoji! Łap je zanim spadną na dół ekranu.
- Dynamiczne spawowanie emoji
- Animacje spadania
- Licznik złapanych emoji

### 🎨 Emoji Paint
Maluj emoji przeciągając myszką po ekranie!
- Paleta 6 różnych emoji
- Regulowany rozmiar pędzla
- Możliwość czyszczenia płótna

### ⚡ Emoji Clicker
Klikaj szybko pojawiające się emoji, zanim znikną!
- 30 sekund na zdobycie jak najwięcej punktów
- Emoji pojawiają się losowo i znikają po 2 sekundach
- System rekordów (zapisywany w localStorage)

### 🧩 Emoji Matcher (Memory)
Klasyczna gra memory - znajdź wszystkie pary emoji!
- Siatka 4x4 (16 kart)
- Licznik ruchów i czasu
- Gratulacje po ukończeniu

## 🚀 Funkcje

- ⚡ **Vite** - Szybki build tool z natychmiastowym HMR
- ⚛️ **React 18** - Najnowsza wersja React z hookami
- 📘 **TypeScript** - Pełne wsparcie typowania
- 🎨 **Tailwind CSS v4** - Nowoczesne stylowanie
- ✨ **Framer Motion** - Płynne animacje
- 🧭 **React Router** - Nawigacja między grami
- 📱 **Responsywny design** - Działa na mobile i desktop

## 📦 Instalacja

```bash
npm install --ignore-scripts
```

> **Uwaga:** Flaga `--ignore-scripts` jest wymagana ze względu na problem z patch-package w rollup. Wszystkie funkcjonalności projektu działają poprawnie.

## 🎮 Uruchomienie

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:5173`

## 📝 Dostępne komendy

- `npm run dev` - Uruchamia serwer deweloperski
- `npm run build` - Buduje aplikację produkcyjną
- `npm run lint` - Sprawdza kod za pomocą ESLint
- `npm run preview` - Podgląd zbudowanej aplikacji

## 📁 Struktura projektu

```
├── public/              # Pliki statyczne
├── src/
│   ├── components/      # Komponenty React
│   │   └── BackButton.tsx
│   ├── pages/           # Strony z grami
│   │   ├── Home.tsx
│   │   ├── EmojiRain.tsx
│   │   ├── EmojiPaint.tsx
│   │   ├── EmojiClicker.tsx
│   │   └── EmojiMatcher.tsx
│   ├── App.tsx          # Routing
│   ├── main.tsx         # Punkt wejścia
│   └── index.css        # Globalne style
├── index.html           # HTML template
├── tailwind.config.js   # Konfiguracja Tailwind
├── tsconfig.json        # Konfiguracja TypeScript
└── vite.config.ts       # Konfiguracja Vite
```

## 🎨 Design

- Kolorowe gradienty
- Płynne animacje i przejścia
- Zaokrąglone rogi i subtelne cienie
- Jasne tło z kolorowymi akcentami
- Efekty hover na wszystkich interaktywnych elementach
- Responsive grid layout

## 🛠️ Technologie

- [React](https://react.dev/) - Biblioteka UI
- [TypeScript](https://www.typescriptlang.org/) - Typowany JavaScript
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Biblioteka animacji
- [React Router](https://reactrouter.com/) - Routing

## 📄 Licencja

MIT

---

Stworzone z ❤️ używając React + TypeScript + Vite
