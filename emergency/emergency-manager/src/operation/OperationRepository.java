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

    public static Operation createOperation(Fire fire, ArrayList<Operation> operations, FireStation[] fireStations, Truck[] trucks, Firefighter[] firefighters) {
        HttpClient client = HttpClient.newHttpClient();

        try {
            //Get nearest fire station
            int nearestFireStationId = 0;
            for (FireStation fireStation : fireStations) {
                if (fireStation.getDistance(fire) < fireStations[nearestFireStationId].getDistance(fire)) {
                    nearestFireStationId = fireStation.getId();
                }
            }
            int fireStationId = nearestFireStationId;

            //Get available trucks
            ArrayList<String> availableTrucksId = new ArrayList<>();
            for (int i = 0; i < fire.getIntensity(); i++) {
                for (Truck truck : trucks) {
                    if (truck.getFireStation().getId() == nearestFireStationId && truck.isAvailable(operations)) {
                        availableTrucksId.add(truck.getPlateNumber());
                    }
                }
            }

            //Get available firefighters
            ArrayList<Integer> availableFirefightersId = new ArrayList<>();
            for (int i = 0; i < availableTrucksId.size() * 4; i++) {
                for (Firefighter firefighter : firefighters) {
                    if (firefighter.getFireStation().getId() == nearestFireStationId && firefighter.isAvailable(operations)) {
                        availableFirefightersId.add(firefighter.getId());
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
