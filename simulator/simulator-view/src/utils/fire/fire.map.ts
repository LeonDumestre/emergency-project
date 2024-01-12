import L from "leaflet";
import { formatDateWithHour } from "../date.utils";
import { Fire, FireWithCircle } from "./fire.model";

export function addFireCircle(map: L.Map, fire: Fire): FireWithCircle {
  const circle = L.circle([fire.latitude, fire.longitude], {
    radius: fire.intensity * 50,
    color: "red",
    fillOpacity: 0.2,
  }).addTo(map);

  circle.bindPopup(getPopupContent(fire));
  return { ...fire, circle };
}

export function updateFireCircle(
  fire: FireWithCircle,
  newFire: Fire
): FireWithCircle {
  fire.intensity = newFire.intensity;

  fire.circle.setRadius(fire.intensity * 50);
  fire.circle.setPopupContent(getPopupContent(fire));

  return fire;
}

export function removeFireCircle(fire: FireWithCircle) {
  fire.circle.remove();
}

function getPopupContent(fire: Fire): string {
  const triggerAt = formatDateWithHour(fire.triggerAt);
  return `<h3>Feu n°${fire.id}</h3>
  Intensité: ${fire.intensity}<br />
  Déclenchement: ${triggerAt}`;
}
