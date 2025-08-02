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
  const parser = new WMSCapabilities()
  try {
    const text = await fetch(`${url}?service=wms&request=GetCapabilities`).then(res => res.text())
    const data = parser.read(text)
    console.log(data)
    
    const allLayers = extractAllLayers(data.Capability.Layer.Layer)

    const title = data.Service.Title

    let layers: string = ''

    allLayers.map((l) => {
        layers = layers + `${l.Name}, `
    })
    layers = layers.slice(0, -2)
    console.log(layers)

    if (mapType.value.toLowerCase() === '3d') {
      const provider = new Cesium.WebMapServiceImageryProvider({
        url: url,
        layers: layers,
      })
      const temporaryImageryLayer = new Cesium.ImageryLayer(provider)
      viewer?.imageryLayers.add(temporaryImageryLayer)
      const result = {
        resource: {
            id: `wms-${Date.now()}`,
            title,
            temporaryImageryLayer,
            enabled: true
        }
      }
      return result

    } else if (mapType.value.toLowerCase() === '2d') {
      const temporaryImageryLayer = new TileLayer({
        source: new TileWMS({
          url: url,
          params: {'LAYERS': layers},
        }),
        zIndex: 500
      })
      console.log(temporaryImageryLayer)
      const itemId = `wms-${Date.now()}`
      temporaryImageryLayer.set('itemId',itemId)
      map.addLayer(temporaryImageryLayer)
      const result = {
        resource: {
            id: itemId,
            title,
            temporaryImageryLayer,
            enabled: true
        }
      }
      console.log(map.getLayers())
      return result
    }

    return allLayers// możesz też zwrócić
  } catch (error) {
    return []
  }
}