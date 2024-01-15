package operation;

import fire.Fire;
import fireStation.FireStation;
import firefighter.Firefighter;
import org.json.JSONObject;
import truck.Truck;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import static java.lang.Math.*;

public class OperationRepository {
    private static final String url = "http://localhost:3010/operations";

    public static Operation createOperation(Fire fire, ArrayList<Operation> operations, ArrayList<FireStation> fireStations, Truck[] trucks, Firefighter[] firefighters) {
        HttpClient client = HttpClient.newHttpClient();

        try {
            int intensity = fire.getIntensity();

            ArrayList<String> availableTrucksId = new ArrayList<>();
            ArrayList<Integer> availableFirefightersId = new ArrayList<>();
            ArrayList<Integer> firefightersInTruck = new ArrayList<>();

            while (availableFirefightersId.size() < intensity * 4){

                ArrayList<FireStation> fireStationsCopy = new ArrayList<>(fireStations);
                System.out.println("Fire stations: " + fireStationsCopy);

                int nearestFireStationId = 0;

                while(availableTrucksId.size() < intensity) {

                    //Get nearest fire station
                    nearestFireStationId = 0;
                    for (int i = 0; i < fireStationsCopy.size(); i++) {
                        if (fireStationsCopy.get(i).getDistance(fire) < fireStationsCopy.get(nearestFireStationId).getDistance(fire)) {
                            nearestFireStationId = i;
                        }
                    }

                    System.out.println("Nearest fire station: " + fireStationsCopy.get(nearestFireStationId).getName());

                    //Get trucks available in fire station
                    for (Truck truck : trucks) {
                        if (truck.getFireStation().getId() == nearestFireStationId && truck.isAvailable(operations) && !availableTrucksId.contains(truck.getPlateNumber()) && availableTrucksId.size() < intensity) {
                            availableTrucksId.add(truck.getPlateNumber());
                            System.out.println("Available truck: " + truck.getPlateNumber());
                            //Get firefighters available in fire station
                            for (Firefighter firefighter : firefighters) {
                                if (operations == null) continue;
                                if (firefighter.getFireStation().getId() == nearestFireStationId && firefighter.isAvailable(operations) && !firefightersInTruck.contains(firefighter.getId()) && firefightersInTruck.size() < 4) {
                                    firefightersInTruck.add(firefighter.getId() + 1);
                                    System.out.println("Available firefighter: " + firefighter.getId());
                                }
                            }
                            //If there is not enough firefighters, remove truck and firefighters
                            if (firefightersInTruck.size() < 4) {
                                availableTrucksId.remove(truck.getPlateNumber());
                                intensity++;
                            } else {
                                availableFirefightersId.addAll(firefightersInTruck);
                                firefightersInTruck.clear();
                                intensity--;
                            }
                        }
                    }

                    if (availableTrucksId.size() < intensity) {
                        if (nearestFireStationId == fireStationsCopy.size() - 1) {
                            return null;
                        }
                        System.out.println("Remove fire station: " + fireStationsCopy.get(nearestFireStationId).getName());
                        fireStationsCopy.remove(nearestFireStationId);
                    }
                    System.out.println("Available trucks: " + availableTrucksId);
                }
                System.out.println("Available firefighters: " + availableFirefightersId);
            }

            String json = new JSONObject()
                    .put("start", LocalDateTime.now())
                    .put("fire", fire.getId())
                    .put("firefighters", availableFirefightersId)
                    .put("trucks", availableTrucksId)
                    .toString();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(java.net.URI.create(url))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            System.out.println("POST Operation: " + json);

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("POST Operation: " + response.body());
            if (response.statusCode() == 201) {
                int id = new JSONObject(response.body()).getInt("id");
                return new Operation(id, fire.getId(), "ON_ROAD", availableFirefightersId ,availableTrucksId, LocalDateTime.now());
            }

        } catch (IOException | InterruptedException e) {
            System.out.println("POST Operation: " + e.getMessage());
        }
        return null;
    }

    public static void removeOperation(int id) {
        HttpClient client = HttpClient.newHttpClient();

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(java.net.URI.create(url + "/" + id))
                    .DELETE()
                    .build();

            System.out.println("DELETE Operation: " + id);

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("DELETE Operation: " + response.body());
        } catch (IOException | InterruptedException e) {
            System.out.println("DELETE Operation: " + e.getMessage());
        }
    }
}
