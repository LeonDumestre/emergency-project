package truck;

import fireStation.FireStation;
import org.apache.commons.text.StringEscapeUtils;
import org.json.JSONArray;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.concurrent.ThreadLocalRandom;

public class TruckInitializer {

    public static Truck[] initialize(FireStation[] fireStations) {
        if (fireStations.length != 0) {
            // Verify if trucks already exist
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request;
            HttpResponse<String> response;

            try {
                request = HttpRequest.newBuilder()
                        .uri(java.net.URI.create("http://localhost:3010/trucks"))
                        .header("Content-Type", "application/json")
                        .GET()
                        .build();
                response = client.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200 && response.body().length() > 2) {
                    JSONArray jsonTrucks = new JSONArray(response.body());
                    Truck[] trucks = new Truck[jsonTrucks.length()];

                    for (int i = 0; i < jsonTrucks.length(); i++) {
                        String cleanLicensePlate = StringEscapeUtils.unescapeJson(jsonTrucks.getJSONObject(i).getString("plate"));
                        String cleanDate = StringEscapeUtils.unescapeJson(jsonTrucks.getJSONObject(i).getString("acquisition"));
                        String cleanType = StringEscapeUtils.unescapeJson(jsonTrucks.getJSONObject(i).getString("type"));
                        int capacity = jsonTrucks.getJSONObject(i).getInt("capacity");
                        int idFireStation = jsonTrucks.getJSONObject(i).getJSONObject("fireStation").getInt("id");

                        trucks[i] = new Truck(cleanLicensePlate, LocalDate.parse(cleanDate), cleanType, capacity, fireStations[idFireStation - 1]);

                        System.out.println("GET Truck: " + trucks[i].toString());
                    }
                    return trucks;
                }
            } catch (IOException | InterruptedException e) {
                System.out.println("GET Trucks: " + e.getMessage());
            }
        }
        return new Truck[0];
    }
}
