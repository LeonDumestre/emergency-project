import L from "leaflet";
import { Fire } from "./fire.model";
import { formatDateWithHour } from "../date.utils";

export function addFireCircle(map: L.Map, fire: Fire) {
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
