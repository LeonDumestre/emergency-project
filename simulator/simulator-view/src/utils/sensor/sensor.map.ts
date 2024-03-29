import L from "leaflet";
import { Sensor } from "./sensor.model";

export function addSensorCircle(map: L.Map, sensor: Sensor) {
  L.circle([sensor.latitude, sensor.longitude], {
    radius: 10,
    color: "black",
    fillOpacity: 0.8,
    opacity: 0.8,
  }).addTo(map);
}
