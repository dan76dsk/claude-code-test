# Instrukcje instalacji

## Zalecana instalacja

Ze względu na problem z patch-package w pakiecie rollup, użyj:

```bash
npm install --ignore-scripts
```

**To jest normalne i bezpieczne.** Wszystkie funkcjonalności projektu działają poprawnie.

## Jeśli masz problemy

Jeśli napotykasz błędy, wyczyść poprzednie instalacje:

```bash
# Usuń node_modules (jeśli istnieje)
rm -rf node_modules

# Usuń package-lock.json (jeśli istnieje)
rm -f package-lock.json

# Wyczyść cache npm
npm cache clean --force

# Zainstaluj ponownie
npm install --ignore-scripts
```

## Uruchomienie projektu

```bash
npm run dev
```

## Sprawdź wersję Node.js i npm

Upewnij się, że masz odpowiednie wersje:

```bash
node --version  # Powinno być >= 18.x
npm --version   # Powinno być >= 9.x
```

Jeśli masz starsze wersje, zaktualizuj Node.js ze strony: https://nodejs.org/
