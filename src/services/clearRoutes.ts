import { viewer } from "./displayMap";
import gsap from "gsap";
import { stopTracking } from "./userLocation";

const clearRoutes = () => {
    viewer!.entities.removeAll();
    stopTracking()
    gsap.to('#routeClear', {opacity: 0, pointerEvents: 'none', visibility: 'hidden', duration: 0.2});
    
}

export {clearRoutes}