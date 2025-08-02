import WMSCapabilities from 'ol/format/WMSCapabilities';
import type { Ref } from 'vue';
import { viewer } from './displayMap';
import * as Cesium from 'cesium'
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import { map } from './olMap';

type WmsLayer = {
  Name?: string
  Title: string
  Abstract?: string
  Layer?: WmsLayer[]
  [key: string]: any
}

const extractAllLayers = (layers: WmsLayer[], collected: WmsLayer[] = []): WmsLayer[] => {
  for (const layer of layers) {
    if (layer.Name) {
      collected.push(layer)
    }
    if (layer.Layer) {
      extractAllLayers(layer.Layer, collected)
    }
  }
  return collected
}

export const getWmsService = async (mapType: Ref<string>, url: string) => {
  const parser = new WMSCapabilities();
  try {
    const response = await fetch(`${url}?service=wms&request=GetCapabilities`);
    
    if (!response.ok) {
      console.error(`Fetch failed with status: ${response.status}`);
      return [];
    }

    const text = await response.text();
    const data = parser.read(text);

    if (!data?.Capability?.Layer?.Layer) {
      console.error('WMS Capabilities response missing expected structure.');
      return [];
    }

    const allLayers = extractAllLayers(data.Capability.Layer.Layer);

    if (allLayers.length === 0) {
      console.warn('No WMS layers found in GetCapabilities response.');
      return [];
    }

    const title = data.Service?.Title || 'Untitled WMS';
    let layers = allLayers.map((l) => l.Name).filter(Boolean).join(',');

    if (mapType.value.toLowerCase() === '3d') {
      const provider = new Cesium.WebMapServiceImageryProvider({
        url: url,
        layers: layers,
      });

      const temporaryImageryLayer = new Cesium.ImageryLayer(provider);
      viewer?.imageryLayers.add(temporaryImageryLayer);
      return {
        resource: {
          id: `wms-${Date.now()}`,
          title,
          temporaryImageryLayer,
          enabled: true,
        },
      };

    } else if (mapType.value.toLowerCase() === '2d') {
      const temporaryImageryLayer = new TileLayer({
        source: new TileWMS({
          url: url,
          params: { 'LAYERS': layers },
        }),
        zIndex: 500,
      });

      const itemId = `wms-${Date.now()}`;
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

    return allLayers;
  } catch (error) {
    console.error('Error loading WMS capabilities:', error);
    return [];
  }
};
