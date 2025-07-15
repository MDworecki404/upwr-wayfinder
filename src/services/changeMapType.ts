import { viewer } from "./displayMap";
import { displayMap } from "./displayMap";
import { createMap, map } from "./olMap";

export const changeMapType = (mapType: string) => {
    if (mapType === '2d'){
        viewer?.destroy()
        createMap()
        document.title = 'UPWr Wayfinder 2D'
    } else if (mapType === '3d') {
        map.setTarget('')
        displayMap('cesiumContainer')
        document.title = 'UPWr Wayfinder 3D'
    }
}