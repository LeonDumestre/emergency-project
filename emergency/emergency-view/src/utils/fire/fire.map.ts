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
    `<h3>Feu #${fire.id}</h3>
    Intensité: ${fire.intensity}<br />
    Déclenchement: ${triggerAt}`
  );
}

export function addOperationLines(map: L.Map, fire: Fire) {
  if (!fire.operation) return;
  const start = formatDateWithHour(fire.operation.start);

  fire.operation.trucks.map((truck) => {
    const operationLine = L.polyline(
      [
        [fire.latitude, fire.longitude],
        [truck.fireStation.latitude, truck.fireStation.longitude],
      ],
      {
        color: "blue",
        opacity: 0.8,
        weight: 3,
        lineCap: "round",
        dashArray: "10, 10",
      }
    ).addTo(map);

    operationLine.bindPopup(
      `<h3>Opération #${fire.operation?.id}</h3>
      ${truck.fireStation.name} -> Feu #${fire.id}<br />
      Départ: ${start}`
    );
  });
}
