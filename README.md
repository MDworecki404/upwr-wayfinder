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
