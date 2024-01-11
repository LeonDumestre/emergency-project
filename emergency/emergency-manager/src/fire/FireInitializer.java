package fire;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class FireInitializer {
    public static Fire[] initialize() {
        Fire[] fires = new Fire[0];
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request;
        HttpResponse<String> response;

        try {
            request = HttpRequest.newBuilder()
                    .uri(java.net.URI.create("http://localhost:3010/fires"))
                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200 && response.body().length() > 2) {
                org.json.JSONArray jsonFires = new org.json.JSONArray(response.body());
                fires = new Fire[jsonFires.length()];

                for (int i = 0; i < jsonFires.length(); i++) {
                    int id = jsonFires.getJSONObject(i).getInt("id");
                    double latitude = jsonFires.getJSONObject(i).getDouble("latitude");
                    double longitude = jsonFires.getJSONObject(i).getDouble("longitude");
                    int intensity = jsonFires.getJSONObject(i).getInt("intensity");
                    fires[i] = new Fire(id, latitude, longitude, intensity);

                    System.out.println("GET Fire: " + fires[i].toString());
                }
            }
        } catch (java.io.IOException | InterruptedException e) {
            System.out.println("GET Fire: " + e.getMessage());
        }
        return fires;
    }
}
