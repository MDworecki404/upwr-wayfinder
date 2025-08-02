import { viewer } from "./displayMap";
import { type Ref } from "vue";
import { map } from "./olMap";

export const zoom = (mapType: Ref<string>, zoomType: string) => {

    if (mapType.value.toLowerCase() === '3d') {
        const camera = viewer?.scene.camera;
        const currentHeight = camera?.positionCartographic?.height || 10000;
        
        const zoomAmount = Math.max(currentHeight * 0.5);
        
        switch(zoomType) {
            case 'in':
                console.log('Zoom in - aktualna wysokość:', currentHeight);
                camera?.zoomIn(zoomAmount);
                break;
            case 'out':
                console.log('Zoom out - aktualna wysokość:', currentHeight);
                camera?.zoomOut(zoomAmount);
                break;
            default:
                console.warn(`Nieznany typ zoom: ${zoomType}`);
        }
    } else if (mapType.value.toLowerCase() === '2d') {
        // Sprawdź czy mapa i view istnieją
        if (!map || !map.getView()) {
            console.warn('Mapa lub view nie są dostępne');
            return;
        }

        const view = map.getView();
        const currentZoom = view.getZoom(); // Dodaj nawiasy!
        
        console.log('Aktualny zoom:', currentZoom);

        // Sprawdź czy currentZoom nie jest undefined
        if (currentZoom === undefined) {
            console.warn('Nie można pobrać aktualnego poziomu zoom');
            return;
        }

        switch(zoomType){
            case 'in':
                view.setZoom(currentZoom + 1);
                break;
            case 'out':
                view.setZoom(currentZoom - 1);
                break;
            default:
                console.warn(`Nieznany typ zoom: ${zoomType}`);
        }
    }
}