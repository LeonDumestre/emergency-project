import L from "leaflet";
import { FireStation } from "./fire-station.model";

export function addFireStationCircle(map: L.Map, fireStation: FireStation) {
  const circle = L.circle([fireStation.latitude, fireStation.longitude], {
    radius: 80,
    color: "green",
    fillOpacity: 0.8,
  }).addTo(map);

  circle.bindPopup(`<h3>${fireStation.name}</h3>`);
}
