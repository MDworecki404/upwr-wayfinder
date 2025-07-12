import VectorSource from "ol/source/Vector";
import { map } from "./olMap";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import upwrBuildings from '../layers2d/upwrBuildingsWithAddresses.json'
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { updatePopUpData } from "./popUpStates";

export let upwrBuildingsLayer2D: VectorLayer;
let hoveredFeature: any = null;

// Funkcja do tworzenia stylu na podstawie typu budynku
const createBuildingStyle = (buildingType: string, isHovered: boolean = false) => {
    let fillColor: string;
    
    switch(buildingType) {
        case 'A':
            fillColor = isHovered ? 'rgb(165, 90, 56)' : 'rgb(135, 70, 36)';
            break;
        case 'B':
            fillColor = isHovered ? 'rgb(161, 125, 50)' : 'rgb(131, 105, 30)';
            break;
        case 'C':
            fillColor = isHovered ? 'rgb(138, 160, 78)' : 'rgb(108, 140, 58)';
            break;
        case 'D':
            fillColor = isHovered ? 'rgb(82, 191, 136)' : 'rgb(52, 171, 116)';
            break;
        case 'E':
            fillColor = isHovered ? 'rgb(30, 219, 213)' : 'rgb(0, 199, 193)';
            break;
        case 'F':
            fillColor = isHovered ? 'rgb(111, 84, 119)' : 'rgb(71, 64, 99)';
            break;
        default:
            fillColor = isHovered ? 'rgb(235, 235, 235)' : 'rgb(255, 255, 255)';
    }
    
    return new Style({
        fill: new Fill({
            color: fillColor,
        }),
        stroke: new Stroke({
            color: isHovered ? 'rgb(255, 255, 0)' : 'rgb(0, 0, 0)',
            width: isHovered ? 3 : 1
        })
    });
};

export const olRegisterUpwrBuildings = (isEnabled: boolean, showPopUp?: () => void) => {
    if (!map) {
        console.error('Mapa OpenLayers nie została jeszcze utworzona');
        return;
    }
    
    if (isEnabled) {
        upwrBuildingsLayer2D = new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON().readFeatures(upwrBuildings)
            }),
            zIndex: 1000
        })

        upwrBuildingsLayer2D.getSource()?.getFeatures().forEach(feature => {
            const buildingType = feature.getProperties().A[0];
            feature.setStyle(createBuildingStyle(buildingType));
        })

        map.addLayer(upwrBuildingsLayer2D)
        map.on('click', (evt) => {
            map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                const newTitle = 'Budynek UPWr';
                const newDescription = `
                    Numer budynku: <b>${feature.get('A')}</b> <br>
                    Adres: <b>${feature.get('B')}</b> <br><br>
                    <b>Informacje dodatkowe:</b> <i>${feature.get('desc')}</i> <br>
                `
                if(showPopUp) {
                    showPopUp();
                }
                updatePopUpData(newTitle, newDescription);
                return true;
            });
        })
        
        map.on('pointermove', (evt) => {
            const pixel = map.getEventPixel(evt.originalEvent);
            const hit = map.hasFeatureAtPixel(pixel);
            
            // Zmień kursor na pointer jeśli nad obiektem
            map.getTargetElement().style.cursor = hit ? 'pointer' : '';
            
            map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                // Rzutowanie na Feature z OpenLayers
                const olFeature = feature as any;
                
                // Jeśli to nowy obiekt, przywróć poprzedni styl
                if (hoveredFeature && hoveredFeature !== olFeature) {
                    const prevBuildingType = hoveredFeature.getProperties().A[0];
                    hoveredFeature.setStyle(createBuildingStyle(prevBuildingType));
                }
                
                // Ustaw nowy hovered feature i zmień jego styl
                hoveredFeature = olFeature;
                const buildingType = olFeature.getProperties().A[0];
                olFeature.setStyle(createBuildingStyle(buildingType, true));
                
                return true;
            });
            
            // Jeśli nie ma obiektu pod kursorem, przywróć poprzedni styl
            if (!hit && hoveredFeature) {
                const buildingType = hoveredFeature.getProperties().A[0];
                hoveredFeature.setStyle(createBuildingStyle(buildingType));
                hoveredFeature = null;
            }
        })
    }
    if (!isEnabled) {
        map.removeLayer(upwrBuildingsLayer2D)
        hoveredFeature = null;
    }
}