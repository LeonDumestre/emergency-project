package fire;

import org.json.JSONObject;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class FireRepository {

    private static final String url = "http://localhost:3110/fires";

    public static Fire createFire(double latitude, double longitude, int intensity) {
        HttpClient client = HttpClient.newHttpClient();

        try {
            LocalDateTime date = LocalDateTime.now();
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("uuuu-MM-dd'T'HH:mm:ssX");
            String cleanDate = date.atOffset(java.time.ZoneOffset.UTC).format(dtf);
            String json = "{\"latitude\":" + latitude+ ",\"longitude\":" + longitude + ",\"intensity\":" + intensity + ",\"triggerAt\":\"" + cleanDate + "\"}";

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(java.net.URI.create(url))
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
