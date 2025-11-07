# Instrukcje instalacji

Jeśli napotykasz problemy z instalacją (błąd `patch-package`), wykonaj poniższe kroki:

## Krok 1: Wyczyść poprzednie instalacje

```bash
# Usuń node_modules (jeśli istnieje)
rm -rf node_modules

# Usuń package-lock.json (jeśli istnieje)
rm -f package-lock.json

# Wyczyść cache npm
npm cache clean --force
```

## Krok 2: Zainstaluj zależności

```bash
npm install
```

## Alternatywne rozwiązanie

Jeśli powyższe nie zadziała, spróbuj:

```bash
npm install --ignore-scripts
```

A następnie:

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
