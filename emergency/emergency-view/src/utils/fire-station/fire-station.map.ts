import L from "leaflet";
import { FireStation } from "./fire-station.model";

export function addFireStationMarker(map: L.Map, fireStation: FireStation) {
  const circle = L.circle([fireStation.latitude, fireStation.longitude], {
    radius: 80,
    color: "green",
    fillOpacity: 0.6,
  }).addTo(map);

  circle.bindPopup(`<h3>${fireStation.name}</h3>`);
}
