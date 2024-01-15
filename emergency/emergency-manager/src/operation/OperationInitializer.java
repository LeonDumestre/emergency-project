package operation;

import fire.Fire;
import fireStation.FireStation;
import firefighter.Firefighter;
import org.json.JSONArray;
import org.json.JSONObject;
import truck.Truck;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Objects;

public class OperationInitializer {
    public static ArrayList<Operation> initialize(Fire[] fires, ArrayList<FireStation> fireStations, Firefighter[] firefighters, Truck[] trucks) {
        if (fires.length != 0 || !fireStations.isEmpty() || firefighters.length != 0 || trucks.length != 0) {

            Operation[] operations = new Operation[0];
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request;
            HttpResponse<String> response;

            try {
                request = HttpRequest.newBuilder()
                        .uri(URI.create("http://localhost:3010/operations"))
                        .header("Content-Type", "application/json")
                        .GET()
                        .build();

                response = client.send(request, HttpResponse.BodyHandlers.ofString());

                System.out.println("GET Operation: " + response.statusCode());
                System.out.println("GET Operation: " + response.body());
                if (response.statusCode() == 200 && response.body().length() > 2) {

                    JSONArray jsonOperations = new JSONArray(response.body());
                    operations = new Operation[jsonOperations.length()];

                    for (int i = 0; i < jsonOperations.length(); i++) {
                        int id = jsonOperations.getJSONObject(i).getInt("id");
                        //verify if fire exist
                        if (!Objects.equals(operations[i].getStatus(), "FINISHED")) {
                            int fireId = jsonOperations.getJSONObject(i).getJSONObject("fire").get("id").hashCode();

                            String status = jsonOperations.getJSONObject(i).getString("status");

                            JSONArray fireFighterId = jsonOperations.getJSONObject(i).getJSONArray("firefighters");
                            JSONArray truckId = jsonOperations.getJSONObject(i).getJSONArray("trucks");

                            ArrayList<String> truckIdArrayList = new ArrayList<>();
                            ArrayList<Integer> fireFighterIdArrayList = new ArrayList<>();

                            for (int j = 0; j < truckId.length(); j++) {
                                JSONObject truck = truckId.getJSONObject(j);
                                truckIdArrayList.add(truck.getString("plate"));
                            }

                            for (int j = 0; j < fireFighterId.length(); j++) {
                                JSONObject firefighter = fireFighterId.getJSONObject(j);
                                fireFighterIdArrayList.add(firefighter.getInt("id"));
                            }

                            String startDate = jsonOperations.getJSONObject(i).getString("start");
                            System.out.println(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                            LocalDateTime startDateTime = LocalDateTime.parse(startDate, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX"));

                            operations[i] = new Operation(id, fireId, status, fireFighterIdArrayList, truckIdArrayList, startDateTime);

                            System.out.println("GET Operation: " + operations[i].toString());
                        }
                        //Delete operation if fire doesn't exist
                        else {
                            request = HttpRequest.newBuilder()
                                    .uri(URI.create("http://localhost:3010/operations/" + id))
                                    .header("Content-Type", "application/json")
                                    .DELETE()
                                    .build();

                            client.send(request, HttpResponse.BodyHandlers.ofString());

                            System.out.println("DELETE Operation: " + id);
                        }
                    }
                    return new ArrayList<>(Arrays.asList(operations));
                }
            } catch (IOException | InterruptedException e) {
                System.out.println("GET Operation: " + e.getMessage());
            }
        }
        return new ArrayList<>();
    }
}
