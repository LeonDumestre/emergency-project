import L from "leaflet";
import { formatDateWithHour } from "../date.utils";
import { Fire, FireWithCircle } from "./fire.model";
import { getFires } from "./fire.request";

export async function setFiresOnMap(
  map: L.Map,
  firesWithCircle: FireWithCircle[]
): Promise<FireWithCircle[]> {
  const fires = await getFires();

  fires.forEach((fire) => {
    const fireWithCircle = firesWithCircle.find(
      (fireWithCircle) => fireWithCircle.id === fire.id
    );

    // Update fire circle if it exists and the intensity has changed
    if (fireWithCircle && fireWithCircle.intensity != fire.intensity) {
      updateFireCircle(fireWithCircle, fire);
    }
    // Add fire circle if it doesn't exist
    else if (!fireWithCircle) {
      firesWithCircle.push(addFireCircle(map, fire));
    }
  });

  // remove fires that are not in the response
  firesWithCircle
    .filter(
      (fireWithCircle) => !fires.find((fire) => fire.id === fireWithCircle.id)
    )
    .forEach((fireWithCircle) => {
      removeFireCircle(fireWithCircle);
      firesWithCircle.splice(firesWithCircle.indexOf(fireWithCircle), 1);
    });

  return firesWithCircle;
}

export function addFireCircle(map: L.Map, fire: Fire): FireWithCircle {
  const circle = L.circle([fire.latitude, fire.longitude], {
    radius: fire.intensity * 50,
    color: "red",
    fillOpacity: 0.2,
  }).addTo(map);

  circle.bindPopup(getPopupContent(fire));
  return { ...fire, circle };
}

function updateFireCircle(fire: FireWithCircle, newFire: Fire): FireWithCircle {
  fire.intensity = newFire.intensity;

  fire.circle.setRadius(fire.intensity * 50);
  fire.circle.setPopupContent(getPopupContent(fire));

  return fire;
}

function removeFireCircle(fire: FireWithCircle) {
  fire.circle.remove();
}

function getPopupContent(fire: Fire): string {
  const triggerAt = formatDateWithHour(fire.triggerAt);
  return `<h3>Feu n°${fire.id}</h3>
  Intensité: ${fire.intensity}<br />
  Déclenchement: ${triggerAt}`;
}
