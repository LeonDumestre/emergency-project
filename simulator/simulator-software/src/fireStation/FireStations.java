package fireStation;

import org.json.JSONArray;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class FireStations {
    private FireStation[] fireStations;

    public FireStations() {
    }

    public FireStation[] getFireStations() {
        return fireStations;
    }

    public void setFireStations(FireStation[] fireStations) {
        this.fireStations = fireStations;
    }

    public void initializeFireStations() {
        // Verify if FireStation.FireStations already exist
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = null;
        HttpResponse<String> response = null;

        try{
            request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:3010/fire-stations"))
                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200 && response.body().length() > 2) {
                System.out.println("FireStations already exist");

                JSONArray jsonFireStations = new JSONArray(response.body());
                this.fireStations = new FireStation[jsonFireStations.length()];

                for (int i = 0; i < jsonFireStations.length(); i++) {
                    int id = jsonFireStations.getJSONObject(i).getInt("id");
                    String name = jsonFireStations.getJSONObject(i).getString("name");
                    double latitude = jsonFireStations.getJSONObject(i).getDouble("latitude");
                    double longitude = jsonFireStations.getJSONObject(i).getDouble("longitude");
                    this.fireStations[i] = new FireStation(id, name, latitude, longitude);

                    System.out.println("GET FireStation: " + this.fireStations[i].toString());
                }
            } else{
                this.fireStations = new FireStation[6];

                // Generate FireStation.FireStations
                this.fireStations[0] = new FireStation(1, "Fire Station 1", 45.778840, 4.878460);
                this.fireStations[1] = new FireStation(2, "Fire Station 2", 45.762779, 4.843930);
                this.fireStations[2] = new FireStation(3, "Fire Station 3", 45.746849, 4.825790);
                this.fireStations[3] = new FireStation(4, "Fire Station 4", 45.731660, 4.828440);
                this.fireStations[4] = new FireStation(5, "Fire Station 5", 45.765872, 4.905116);
                this.fireStations[5] = new FireStation(6, "Fire Station 6", 45.783848, 4.821030);

                for (int i = 0; i < fireStations.length; i++) {
                    fireStations[i].postFireStation();
                }
            }
        } catch (IOException | InterruptedException e) {
            System.out.println("GET FireStation: " + e.getMessage());
        }
    }
}
