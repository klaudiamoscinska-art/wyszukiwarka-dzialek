# Wyszukiwarka Działek

Prosta appka (jeden plik `index.html`, HTML+CSS+JS bez zależności i bez
backendu), która generuje gotowe linki wyszukiwania ofert działek i domów
na kilku polskich portalach nieruchomości — na podstawie wybranej
miejscowości górskiej (Tatry, Podhale, Beskidy, Bieszczady, Sudety),
rodzaju nieruchomości, ceny i powierzchni. Obsługiwane portale: Otodom,
OLX, Domiporta, Nieruchomości-online i GetHome. Appka niczego nie
scrapuje ani nie wywołuje żadnego API — tylko buduje adresy URL i otwiera
je w nowej karcie.

Działa jako PWA — ma `manifest.json` i `service-worker.js`, więc można ją
zainstalować na ekranie głównym telefonu, a powłoka strony (HTML,
manifest, ikony) jest dostępna offline.

## Uruchomienie lokalnie

To zwykły statyczny plik HTML — wystarczy otworzyć `index.html`
bezpośrednio w przeglądarce, albo odpalić lokalny serwer (zalecane, żeby
service worker i manifest działały tak jak w produkcji):

```bash
python3 -m http.server 8000
```

i wejść na `http://localhost:8000/`.

## Hosting

Appka jest hostowana na GitHub Pages:
`https://klaudiamoscinska-art.github.io/wyszukiwarka-dzialek/` — deploy
jest automatyczny po pushu do `main` (ok. 30–60 s). Szerszy kontekst
techniczny (obie appki, decyzje projektowe, znane pułapki) jest opisany w
`HANDOFF.md` w repo [`analiza-dzialki`](https://github.com/klaudiamoscinska-art/analiza-dzialki/blob/main/HANDOFF.md)
— ten plik istnieje tylko tam, żeby nie utrzymywać dwóch kopii.

## Jak dodać nową miejscowość

Edytuj tablicę `REGIONS` w `index.html` (w bloku `<script>`). Każdy wpis
to `{ label, otodom, olx }` — `otodom` to ścieżka województwo/powiat/gmina
używana przez Otodom, `olx` to slug miejscowości używany przez OLX (a
także przez Domiporta i Nieruchomości-online). Wpis-nagłówek sekcji to
`{ label: "...", isDivider: true }`.

## Jak dodać nowy portal

Edytuj tablicę `PORTALS` w `index.html`. Dopisz obiekt
`{ id, label, buildUrl(filters) }`, gdzie `buildUrl` dostaje
`{ type, region, priceMin, priceMax, areaMin, areaMax }` i zwraca gotowy
string URL. Karta linku do nowego portalu pojawi się automatycznie w
wynikach — nie trzeba nic zmieniać w renderowaniu.
