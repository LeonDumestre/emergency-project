import L from "leaflet";
import { Fire, FireWithCircle } from "./fire.model";
import { getFires } from "./fire.request";
import { ON_ROAD } from "../operation/operation.model";

export async function setFiresOnMap(
  map: L.Map,
  firesWithCircle: FireWithCircle[]
): Promise<FireWithCircle[]> {
  // Get fires from the API
  const fires = await getFires();

  // Update fires that are in the response
  fires.forEach((fire) => {
    const fireWithCircle = firesWithCircle.find(
      (fireWithCircle) => fireWithCircle.id === fire.id
    );

    /*const sameFire = firesWithCircle.find(
      (fireWithCircle) =>
        fireWithCircle.latitude === fire.latitude &&
        fireWithCircle.longitude === fire.longitude &&
        fireWithCircle.id !== fire.id
    );

    if (sameFire) {
      removeFireCircle(sameFire);
      firesWithCircle.splice(firesWithCircle.indexOf(sameFire), 1);
    }*/

    // Update fire circle if it exists and the intensity has changed
    if (fireWithCircle && fireWithCircle.intensity != fire.intensity) {
      updateFireCircle(fireWithCircle, fire);
    }
    // Add fire circle if it doesn't exist
    else if (!fireWithCircle && fire.intensity > 0) {
      firesWithCircle.push(addFireCircle(map, fire));
    }
    // Remove fire circle if it doesn't exist and the intensity is 0
    else if (fireWithCircle && fire.intensity === 0) {
      removeFireCircle(fireWithCircle);
      firesWithCircle.splice(firesWithCircle.indexOf(fireWithCircle), 1);
    }
  });

  // remove fires that are not in the response
  firesWithCircle
    .filter(
      (fireWithCircle) => !fires.find((fire) => fire.id === fireWithCircle.id)
    )
    .forEach((fireWithCircle) => {
      const fire = fires.find((fire) => fire.id === fireWithCircle.id);
      if (!fire || fire.intensity === 0) {
        removeFireCircle(fireWithCircle);
        firesWithCircle.splice(firesWithCircle.indexOf(fireWithCircle), 1);
      }
    });

  return firesWithCircle;
}

export function addFireCircle(map: L.Map, fire: Fire): FireWithCircle {
  const circle = L.circle([fire.latitude, fire.longitude], {
    radius: fire.intensity * 50,
    color: getFireColor(fire),
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
  return `<h3>Feu n°${fire.id}</h3>
  Intensité: ${fire.intensity}`;
}

function getFireColor({ operation }: Fire): string {
  if (!operation || operation?.status === ON_ROAD) {
    return "red";
  }
  return "blue";
}
