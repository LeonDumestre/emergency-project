import L from "leaflet";
import { formatDateWithHour } from "../date.utils";
import {
  ON_ROAD,
  ON_SITE,
  Operation,
  OperationWithLines,
} from "./operation.model";
import { getOperations } from "./operation.request";
import { BaseFireStation } from "../fire-station/fire-station.model";

export async function setOperationsOnMap(
  map: L.Map,
  operationsWithLines: OperationWithLines[]
): Promise<OperationWithLines[]> {
  // get operations from the API
  const operations = await getOperations();

  // update operations that are in the response
  operations.forEach((operation) => {
    const operationWithLines = operationsWithLines.find(
      (operationWithLines) => operationWithLines.id === operation.id
    );

    // update operation lines if it exists
    if (operationWithLines) {
      updateOperationLines(operationWithLines, operation);
    }
    // add operation lines if it doesn't exist
    else {
      operationsWithLines.push(addOperationLines(map, operation));
    }
  });

  // remove operations that are not in the response
  operationsWithLines.forEach((operationWithLines) => {
    const operation = operations.find(
      (operation) => operation.id === operationWithLines.id
    );

    if (!operation) {
      operationWithLines.lines.forEach((line) => line.remove());
    }
  });

  return operationsWithLines;
}

export function addOperationLines(
  map: L.Map,
  newOperation: Operation
): OperationWithLines {
  if (!newOperation.fire) {
    throw new Error("Operation must have a fire");
  }

  // create an array of trucks fire stations without duplicates
  const fireStations = extractFireStations(newOperation);

  // create an array of lines between fire stations and new fire
  const lines = fireStations.map((fireStation) => {
    const line = L.polyline(
      [
        [fireStation.latitude, fireStation.longitude],
        [newOperation.fire!.latitude, newOperation.fire!.longitude],
      ],
      getPolylineOptions(newOperation)
    ).addTo(map);

    line.bindPopup(getPopupContent(newOperation, fireStation));
    return line;
  });

  return { ...newOperation, lines };
}

function updateOperationLines(
  operation: OperationWithLines,
  newOperation: Operation
): OperationWithLines {
  // update operation status
  operation = { ...newOperation, lines: operation.lines };

  // update operation lines
  operation.lines.forEach((line) => {
    line.setStyle(getPolylineOptions(newOperation));
  });

  return operation;
}

function getPolylineOptions(operation: Operation): L.PolylineOptions {
  const color =
    operation.status === ON_ROAD
      ? "purple"
      : operation.status === ON_SITE
      ? "transparent"
      : "green";
  const dashArray = operation.status === ON_ROAD ? "20, 20" : "5, 5";
  return { color, opacity: 0.8, weight: 3, lineCap: "round", dashArray };
}

function getPopupContent(
  operation: Operation,
  fireStation: BaseFireStation
): string {
  const operationStart = formatDateWithHour(operation.start);
  const trucks = operation.trucks
    .filter((truck) => truck.fireStation === fireStation)
    .map((truck) => `${truck.type} ${truck.plate}`)
    .join(", ");
  const firefighters = operation.firefighters
    .filter((firefighter) => firefighter.fireStationId === fireStation.id)
    .map((firefighter) => firefighter.name)
    .join(", ");

  return `<h3>Opération n°${operation.id}</h3>
    ${fireStation.name} -> Feu n°${operation.id}<br />
    Départ: ${operationStart}<br />
    Statut: ${operation.status}
    ${trucks ? `<br />Camions: ${trucks}` : ""}
    ${firefighters ? `<br />Pompiers: ${firefighters}` : ""}`;
}

function extractFireStations(operation: Operation): BaseFireStation[] {
  return operation.trucks
    .map((truck) => truck.fireStation)
    .filter(
      (fireStation, index, fireStations) =>
        fireStations.indexOf(fireStation) === index
    );
}
