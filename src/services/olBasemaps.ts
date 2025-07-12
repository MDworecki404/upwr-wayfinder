import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { map } from './olMap';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import { optionsFromCapabilities } from 'ol/source/WMTS';
import WMTS from 'ol/source/WMTS';
import Layer from 'ol/layer/WebGLTile.js';
import Source from 'ol/source/ImageTile.js';

let osmLayer = new TileLayer({
    source: new OSM(),
    zIndex: 1
})
let ortoLayer
let googleLayer = new Layer({
    source: new Source({
        url: 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}&hl={pl}'
    }),
    zIndex: 1
})
let esriLayer = new Layer({
    source: new Source({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}&hl={pl}'
    }),
    zIndex: 1
})

const parser = new WMTSCapabilities();

export const defaultOlBasemap = () => {
    map.setLayers([
        osmLayer
    ])
}

export const changeOlBasemap = (basemap: string) => {
    if (!map) {
        console.error('Mapa OpenLayers nie została jeszcze utworzona');
        return;
    }
    switch (basemap){
        case 'osm':
            map.removeLayer(osmLayer)
            map.removeLayer(ortoLayer!)
            map.removeLayer(googleLayer)
            map.removeLayer(esriLayer)

            map.addLayer(osmLayer)
            break;
        case 'ortho':
            fetch('https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMTS/StandardResolution?Service=WMTS&Request=GetCapabilities')
            .then(response => response.text())
            .then(text => {
                const result = parser.read(text)
                const options = optionsFromCapabilities(result, {
                    layer: 'ORTOFOTOMAPA',
                    matrixSet: 'EPSG:3857',
                })
                
                if (options) {
                    ortoLayer = new TileLayer({
                        opacity: 1,
                        source: new WMTS(options),
                    })
                    map.removeLayer(osmLayer)
                    map.removeLayer(ortoLayer!)
                    map.removeLayer(googleLayer)
                    map.removeLayer(esriLayer)

                    map.addLayer(ortoLayer)
                }
            })
            
            break;
        case 'google':
            map.removeLayer(osmLayer)
            map.removeLayer(ortoLayer!)
            map.removeLayer(googleLayer)
            map.removeLayer(esriLayer)

            map.addLayer(googleLayer)
            break;
        case 'esri':
            map.removeLayer(osmLayer)
            map.removeLayer(ortoLayer!)
            map.removeLayer(googleLayer)
            map.removeLayer(esriLayer)

            map.addLayer(esriLayer)
            
            break;
    }
}