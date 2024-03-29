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
  console.log(fires);

  // Update fires that are in the response
  fires.forEach((fire) => {
    const fireWithCircle = firesWithCircle.find(
      (fireWithCircle) => fireWithCircle.id === fire.id
    );

    const sameFire = firesWithCircle.find(
      (fireWithCircle) =>
        fireWithCircle.latitude === fire.latitude &&
        fireWithCircle.longitude === fire.longitude &&
        fireWithCircle.id !== fire.id
    );

    if (sameFire) {
      removeFireCircle(sameFire);
      firesWithCircle.splice(firesWithCircle.indexOf(sameFire), 1);
    }

    // Remove fire circle if it doesn't exist and the intensity is 0
    if (fireWithCircle && fire.intensity === 0) {
      removeFireCircle(fireWithCircle);
      firesWithCircle.splice(firesWithCircle.indexOf(fireWithCircle), 1);
    }
    // Update fire circle if it exists and the intensity has changed
    else if (
      fireWithCircle &&
      (fireWithCircle.operation?.status !== fire.operation?.status ||
        fireWithCircle.intensity !== fire.intensity)
    ) {
      console.log("UPDATE FIRE: " + fireWithCircle, fire);
      updateFireCircle(fireWithCircle, fire);
    }
    // Add fire circle if it doesn't exist
    else if (!fireWithCircle && fire.intensity > 0) {
      firesWithCircle.push(addFireCircle(map, fire));
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
  console.log("NEW FIRE: " + fire.id);
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
  try {
    fire.circle.setRadius(fire.intensity * 50);
    fire.circle.setPopupContent(getPopupContent(fire));
  } catch (error) {
    console.error(error);
  }
  return fire;
}

function removeFireCircle(fire: FireWithCircle) {
  try {
    console.log("REMOVE FIRE: " + fire.id);
    fire.circle.remove();
  } catch (error) {
    console.error(error);
  }
}

function getPopupContent(fire: Fire): string {
  return `<h3>Feu n°${fire.id}</h3>
  Intensité: ${fire.intensity}`;
}

function getFireColor({ operation }: Fire): string {
  if (!operation || operation?.status === ON_ROAD) return "red";
  return "blue";
}
