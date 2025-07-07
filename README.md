# UPWr Wayfinder

**UPWr Wayfinder** to geoportal dla studentów Uniwersytetu Przyrodniczego we Wrocławiu, ułatwiający nawigację po kampusie uczelni. Aplikacja pozwala na wyszukiwanie tras pomiędzy budynkami, przeglądanie warstw 3D, korzystanie z osi czasu oraz interaktywne wyszukiwanie budynków.

## Funkcje

- Interaktywna mapa kampusu UPWr z wykorzystaniem CesiumJS
- Wyszukiwanie tras pomiędzy budynkami
- Przeglądanie budynków w 3D (GeoJSON, 3D Tiles)
- Oś czasu do ustawiania wybranego czasu na mapie
- Wyszukiwarka budynków
- Obsługa wielu warstw mapy (ortofotomapa, budynki 3D Google, OSM, LoD1, budynki UPWr)
- Wsparcie dla języka polskiego i angielskiego

---

## Przewodnik użytkownika

### 1. **Przeglądanie mapy**
- Po uruchomieniu aplikacji zobaczysz mapę kampusu UPWr.
- Możesz przesuwać mapę myszką oraz przybliżać/oddalać za pomocą scrolla.

### 2. **Wyszukiwanie budynków**
- Po prawej stronie znajdziesz wyszukiwarkę budynków.
- Zacznij wpisywać nazwę lub kod budynku, a następnie wybierz z listy.
- Kliknij przycisk „Wyszukaj budynek”, aby przenieść widok na wybrany budynek.

### 3. **Wyznaczanie trasy**
- W panelu po prawej wybierz zakładkę „Wyszukiwarka tras”.
- Wybierz budynek początkowy i docelowy oraz tryb transportu (pieszo, rower, samochód).
- Kliknij „Wyszukaj trasę”, aby zobaczyć trasę na mapie.
- Możesz wyczyścić trasę przyciskiem „Wyczyść trasę”.

### 4. **Zmiana warstw mapy**
- W panelu „Warstwy 3D” możesz włączać i wyłączać różne warstwy budynków 3D (Google, OSM, LoD1, UPWr).
- W panelu „Mapy podkładowe” możesz zmieniać podkład mapowy (OpenStreetMap, ortofotomapa, Google, Esri).

### 5. **Oś czasu (symulacja dnia i nocy)**
- Kliknij ikonę zegara w lewym dolnym rogu, aby otworzyć oś czasu.
- Przesuwaj suwak, aby ustawić wybraną godzinę – mapa i budynki będą się rozjaśniać lub przyciemniać w zależności od pory dnia.

### 6. **Legenda**
- Kliknij ikonę legendy przy warstwie „Budynki UPWr”, aby zobaczyć kolory odpowiadające różnym typom budynków.

### 7. **Zmiana języka**
- W panelu „Ustawienia” możesz przełączyć język aplikacji na polski lub angielski.

### 8. **Informacje o budynku**
- Kliknij na budynek na mapie, aby zobaczyć szczegółowe informacje (adres, opis, numer).

---

## Wymagania

- Node.js (zalecana wersja 18+)
- Cesium Ion API Key (do obsługi niektórych warstw 3D)

## Instalacja

1. Sklonuj repozytorium:
   ```bash
   git clone <adres_repozytorium>
   cd upwr-wayfinder
   ```

2. Zainstaluj zależności:
   ```bash
   npm install
   ```

3. Utwórz plik `.env` w katalogu głównym i dodaj swój klucz Cesium Ion:
   ```
   VITE_CESIUM_API_KEY=your_cesium_ion_api_key
   ```

## Uruchomienie aplikacji

Aby uruchomić aplikację w trybie deweloperskim:
```bash
npm run dev
```
Aplikacja będzie dostępna pod adresem [http://localhost:5173](http://localhost:5173) (domyślnie).

Aby zbudować aplikację produkcyjnie:
```bash
npm run build
```

## Technologie

- [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [CesiumJS](https://cesium.com/platform/cesiumjs/)
- [Vuetify 3](https://next.vuetifyjs.com/)
- [GSAP](https://greensock.com/gsap/)

## Licencja

MIT
