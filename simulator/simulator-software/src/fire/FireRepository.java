package fire;

import org.json.JSONObject;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class FireRepository {

    private static final String simulatorUrl = "http://localhost:3110/fires";
    private static final String emergencyUrl = "http://localhost:3010/fires";

    public static Fire[] getEmergencyFires() {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request;
        HttpResponse<String> response;

        try{
            request = HttpRequest.newBuilder()
                    .uri(java.net.URI.create(emergencyUrl))
                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200 && response.body().length() > 2) {
                System.out.println("GET Emergency Fires: " + response.body());
                JSONObject jsonFire = new JSONObject(response.body());
                Fire[] fires = new Fire[jsonFire.length()];

                for (int i = 0; i < jsonFire.length(); i++) {
                    int id = jsonFire.getJSONObject(String.valueOf(i)).getInt("id");
                    double latitude = jsonFire.getJSONObject(String.valueOf(i)).getDouble("latitude");
                    double longitude = jsonFire.getJSONObject(String.valueOf(i)).getDouble("longitude");
                    int intensity = jsonFire.getJSONObject(String.valueOf(i)).getInt("intensity");

                    fires[i] = new Fire(id, latitude, longitude, intensity);
                    System.out.println("GET Emergency Fire: " + fires[i]);
                }
                return fires;
            }
        } catch (IOException | InterruptedException e) {
            System.out.println("GET Emergency Fires: " + e.getMessage());
        }
        return null;
    }

    public static Fire createFire(double latitude, double longitude, int intensity) {
        HttpClient client = HttpClient.newHttpClient();

        try {
            LocalDateTime date = LocalDateTime.now();
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("uuuu-MM-dd'T'HH:mm:ssX");
            String cleanDate = date.atOffset(java.time.ZoneOffset.UTC).format(dtf);
            String json = "{\"latitude\":" + latitude+ ",\"longitude\":" + longitude + ",\"intensity\":" + intensity + ",\"triggerAt\":\"" + cleanDate + "\"}";

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(java.net.URI.create(simulatorUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            System.out.println("POST Fire: " + json);

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("POST Fire Response: " + response.body());
            if (response.statusCode() == 201) {
                int id = new JSONObject(response.body()).getInt("id");
                return new Fire(id, latitude, longitude, intensity);
            }

        } catch (IOException | InterruptedException e) {
            System.out.println("POST Fire Response: " + e.getMessage());
        }
        return null;
    }

    public static void updateIntensity(int id, int intensity) {
        HttpClient client = HttpClient.newHttpClient();

        try {
            String json = "{\"intensity\":" + intensity + "}";

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(java.net.URI.create("http://localhost:3110/fires/" + id + "/intensity"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            System.out.println("POST Fire Intensity: " + json);

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("POST Fire Intensity Response: " + response.body());

        } catch (IOException | InterruptedException e) {
            System.out.println("POST Fire Intensity Response: " + e.getMessage());
        }
    }

}
