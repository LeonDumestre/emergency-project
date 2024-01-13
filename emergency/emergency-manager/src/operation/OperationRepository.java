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

            while (availableFirefightersId.size() < intensity * 4){

                int nearestFireStationId = 0;

                while(availableTrucksId.size() < intensity) {
                    //Get nearest fire station
                    for (int i = 0; i < fireStations.size(); i++) {
                        if (fireStations.get(i).getDistance(fire) < fireStations.get(nearestFireStationId).getDistance(fire)) {
                            nearestFireStationId = i;
                            System.out.println("Nearest fire station: " + fireStations.get(i).getName());
                        }
                    }

                    //Get trucks available in fire station
                    for (Truck truck : trucks) {
                        if (truck.getFireStation().getId() == nearestFireStationId && truck.isAvailable(operations) && !availableTrucksId.contains(truck.getPlateNumber()) && availableTrucksId.size() < intensity) {
                            availableTrucksId.add(truck.getPlateNumber());
                            System.out.println("Available truck: " + truck.getPlateNumber());
                            //Get firefighters available in fire station
                            for (Firefighter firefighter : firefighters) {
                                if (firefighter.getFireStation().getId() == nearestFireStationId && firefighter.isAvailable(operations) && !availableFirefightersId.contains(firefighter.getId()) && availableFirefightersId.size() < 4) {
                                    availableFirefightersId.add(firefighter.getId() + 1);
                                    System.out.println("Available firefighter: " + firefighter.getId());
                                    intensity--;
                                }
                            }
                            //If there is not enough firefighters, remove truck and go to next fire station
                            if (availableFirefightersId.size() < 4) {
                                availableTrucksId.remove(truck.getPlateNumber());
                                break;
                            }
                        }
                    }
                    if (availableTrucksId.size() < intensity) {
                        fireStations.remove(nearestFireStationId);
                    }
                }
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
                return new Operation(id, fire.getId(), availableFirefightersId, availableTrucksId, LocalDateTime.now());
            }

        } catch (IOException | InterruptedException e) {
            System.out.println("POST Operation: " + e.getMessage());
        }
        return null;
    }
}
