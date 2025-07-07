import * as Cesium from 'cesium';
import { viewer } from './displayMap';

const setTime = (hour: number, minute: number, second: number = 0) => {
    if (!viewer) return;
    const currentJulian = viewer.clock.currentTime;
    const currentDate = Cesium.JulianDate.toDate(currentJulian);
    currentDate.setHours(hour);
    currentDate.setMinutes(minute);
    currentDate.setSeconds(second);
    const newJulian = Cesium.JulianDate.fromDate(currentDate);
    viewer.clock.currentTime = newJulian;
};

const isCurrentSecond = (seconds: number) => {
    if (!viewer) return false;
    const currentJulian = viewer.clock.currentTime;
    const currentDate = Cesium.JulianDate.toDate(currentJulian);
    return currentDate.getSeconds() === seconds;
};

export { setTime, isCurrentSecond };