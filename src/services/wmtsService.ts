import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import type { Ref } from 'vue';
import { viewer } from './displayMap';
import * as Cesium from 'cesium'
import TileLayer from 'ol/layer/Tile';
import { map } from './olMap';
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS';

interface WmtsLayer {
  Identifier: string;
  Title: string;
  Abstract?: string;
  Format?: string[];
  Style?: any[];
  TileMatrixSetLink?: any[];
  WGS84BoundingBox?: number[];
}

export const getWmtsService = async (mapType: Ref<string>, url: string) => {
  const parser = new WMTSCapabilities();
  try {
    const response = await fetch(`${url}?service=WMTS&request=GetCapabilities&version=1.0.0`);
    
    if (!response.ok) {
      console.error(`Fetch failed with status: ${response.status}`);
      return [];
    }

    const text = await response.text();
    const data = parser.read(text);

    if (!data?.Contents?.Layer || data.Contents.Layer.length === 0) {
      console.warn('Brak warstw w odpowiedzi WMTS.');
      return [];
    }

    const layers: WmtsLayer[] = data.Contents.Layer;
    const title = data?.ServiceIdentification?.Title || 'Untitled WMTS';

    const firstLayer = layers[0];
    if (!firstLayer?.Identifier) {
      console.warn('Pierwsza warstwa nie zawiera identyfikatora.');
      return [];
    }

    const crsList = (firstLayer.TileMatrixSetLink || [])
  .map(link => link.TileMatrixSet)
  .filter((v, i, self) => v && self.indexOf(v) === i);

// Lista dostępnych identyfikatorów TileMatrixSet z odpowiedzi
const availableMatrixSets = data.Contents.TileMatrixSet?.map((tms: { Identifier: any; }) => tms.Identifier) || [];

if (crsList.length === 0 || availableMatrixSets.length === 0) {
  console.warn('Brak dostępnych układów współrzędnych lub brak definicji TileMatrixSet.');
  return [];
}

// Ustawienie EPSG:3857 jako priorytetowe, ale tylko jeśli istnieje jako definicja
let bestProjection = '';

// Priorytet EPSG:3857 jeśli dostępne i zdefiniowane
if (crsList.includes('EPSG:3857') && availableMatrixSets.includes('EPSG:3857')) {
  bestProjection = 'EPSG:3857';
} else {
  // Wybierz pierwszy, który jest wspólny
  bestProjection = crsList.find(crs => availableMatrixSets.includes(crs)) || '';
}
console.log(bestProjection)
if (!bestProjection) {
  console.warn('Brak zgodnych układów współrzędnych między warstwą a definicją TileMatrixSet.');
  return [];
}

const options = optionsFromCapabilities(data, {
  layer: firstLayer.Identifier,
  matrixSet: bestProjection
});
    if (!options) {
      console.warn('Nie udało się wygenerować opcji z capabilities.');
      return [];
    }

    if (mapType.value.toLowerCase() === '3d') {
      const style = options.style ?? 'default';
      const format = options.format ?? 'image/jpeg';
      const provider = new Cesium.WebMapTileServiceImageryProvider({
        url: url,
        layer: firstLayer.Identifier,
        style: style,
        format: format,
        tileMatrixSetID: bestProjection,
        maximumLevel: options?.tileGrid?.getMaxZoom?.() ?? 18
      });

      const temporaryImageryLayer = new Cesium.ImageryLayer(provider);
      viewer?.imageryLayers.add(temporaryImageryLayer);

      return {
        resource: {
          id: `wmts-${Date.now()}`,
          title,
          temporaryImageryLayer,
          enabled: true
        }
      };

    } else if (mapType.value.toLowerCase() === '2d') {
      const temporaryImageryLayer = new TileLayer({
        opacity: 1,
        source: new WMTS(options),
        zIndex: 500
      })

      const itemId = `wmts-${Date.now()}`;
      temporaryImageryLayer.set('itemId', itemId);
      map.addLayer(temporaryImageryLayer);

      return {
        resource: {
          id: itemId,
          title,
          temporaryImageryLayer,
          enabled: true,
        },
      };
    }

    return layers;
  } catch (error) {
    console.error('Błąd przy pobieraniu/parsingu WMTS:', error);
    return [];
  }
};