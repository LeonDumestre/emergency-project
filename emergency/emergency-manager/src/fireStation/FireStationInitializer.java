package fireStation;

import fire.Fire;
import org.json.JSONArray;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;

public class FireStationInitializer {

    public static ArrayList<FireStation> initialize() {
        // Verify if FireStation.FireStations already exist
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request;
        HttpResponse<String> response;

        try{
            request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:3010/fire-stations"))
                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200 && response.body().length() > 2) {
                JSONArray jsonFireStations = new JSONArray(response.body());
                ArrayList<FireStation> fireStations = new ArrayList<>();

                for (int i = 0; i < jsonFireStations.length(); i++) {
                    int id = jsonFireStations.getJSONObject(i).getInt("id");
                    String name = jsonFireStations.getJSONObject(i).getString("name");
                    double latitude = jsonFireStations.getJSONObject(i).getDouble("latitude");
                    double longitude = jsonFireStations.getJSONObject(i).getDouble("longitude");
                    fireStations.add(new FireStation(id, name, latitude, longitude));

                    System.out.println("GET FireStation: " + fireStations.get(i).toString());
                }
                return fireStations;
            }
        } catch (IOException | InterruptedException e) {
            System.out.println("GET FireStation: " + e.getMessage());
        }
        return null;
    }
}
