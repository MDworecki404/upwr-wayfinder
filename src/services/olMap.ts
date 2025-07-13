import { Map } from 'ol';
import View from 'ol/View';
import { useGeographic } from 'ol/proj';
import 'ol/ol.css'
import startConfig from '../data/startConfig.json'
import { defaultOlBasemap } from './olBasemaps';


useGeographic()

export let map: Map

export const createMap = () => {
    map = new Map({
        target: 'cesiumContainer',
        layers: [],
        controls: [],
        view: new View({
            center: [startConfig.camera.defaultPosition.longitude, startConfig.camera.defaultPosition.latitude+0.01],
            zoom: 14,
        }),
    });
    defaultOlBasemap()

}