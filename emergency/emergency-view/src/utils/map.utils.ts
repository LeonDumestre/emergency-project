import L from "leaflet";
import { formatDateWithHour } from "./date.utils";
import { Fire } from "./fire/fire.model";

export function initMap(): L.Map {
  // Initialisez la carte Leaflet
  const minZoom = 13;
  const map = L.map("map", { minZoom }).setView([45.75, 4.856], 13);

  // Ajoutez une couche de carte OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  return map;
}

export function addCircle(map: L.Map, fire: Fire) {
  const circle = L.circle([fire.latitude, fire.longitude], {
    radius: fire.intensity * 50,
    color: "red",
    fillOpacity: 0.2,
  }).addTo(map);

  const triggerAt = formatDateWithHour(fire.triggerAt);
  circle.bindPopup(
    `Intensité: ${fire.intensity}<br />
    Déclenchement: ${triggerAt}`
  );
}