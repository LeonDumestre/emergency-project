package fire;

import operation.Operation;
import operation.OperationRepository;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class FireRepository {

    private static final String simulatorUrl = "http://localhost:3110/fires";
    private static final String emergencyUrl = "http://localhost:3010/fires";

    public static List<Fire> getEmergencyFires() {
        HttpClient client = HttpClient.newHttpClient();

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(java.net.URI.create(simulatorUrl))
                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            HttpRequest requestOp = HttpRequest.newBuilder()
                    .uri(java.net.URI.create(emergencyUrl + "/with-operation"))
                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            HttpResponse<String> responseOp = client.send(requestOp, HttpResponse.BodyHandlers.ofString());
            JSONArray jsonFiresOp = new JSONArray(response.body());

            System.out.println("GET Emergency Fires Response: " + response.body());
            if (response.statusCode() == 200) {
                JSONArray jsonFires = new JSONArray(response.body());
                List<Fire> emergencyFires = new ArrayList<>();
                for (int i = 0; i < jsonFires.length(); i++) {
                    JSONObject jsonFire = jsonFires.getJSONObject(i);
                    int id = jsonFire.getInt("id");
                    double latitude = jsonFire.getInt("latitude");
                    double longitude = jsonFire.getInt("longitude");
                    int intensity = jsonFire.getInt("intensity");

                    for (int j = 0; j < jsonFiresOp.length(); j++) {
                        if (jsonFiresOp.getJSONObject(j).getInt("fireId") == id) {
                            Operation operation = OperationRepository.parseOperation(jsonFiresOp.getJSONObject(j).getJSONObject("operation"));
                            emergencyFires.add(new Fire(id, latitude, longitude, intensity, operation));
                            continue;
                        }
                    }
                }
                return emergencyFires;
            }

        } catch (IOException | InterruptedException e) {
            System.out.println("GET Emergency Fires Response: " + e.getMessage());
        }
        return null;
    }

    public static Fire createFire(double latitude, double longitude, int intensity) {
        HttpClient client = HttpClient.newHttpClient();

        try {
            LocalDateTime date = LocalDateTime.now();
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("uuuu-MM-dd'T'HH:mm:ssX");
            String cleanDate = date.atOffset(java.time.ZoneOffset.UTC).format(dtf);
            String json = "{\"latitude\":" + latitude + ",\"longitude\":" + longitude + ",\"intensity\":" + intensity + ",\"triggerAt\":\"" + cleanDate + "\"}";

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(simulatorUrl))
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
                    .uri(URI.create("http://localhost:3110/fires/" + id + "/intensity"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            System.out.println("POST Fire Intensity: " + json);

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("POST Fire " + id + " Intensity Response: " + response.body());

        } catch (IOException | InterruptedException e) {
            System.out.println("POST Fire Intensity Response: " + e.getMessage());
        }
    }

    public static void remove(int id) {
        HttpClient client = HttpClient.newHttpClient();

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(simulatorUrl + "/" + id))
                    .header("Content-Type", "application/json")
                    .DELETE()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("DELETE Fire " + id + ": " + response.statusCode());
        } catch (IOException | InterruptedException e) {
            System.out.println("DELETE Fire: " + e.getMessage());
        }
    }

    public static void removeAll() {
        HttpClient client = HttpClient.newHttpClient();

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(simulatorUrl))
                    .header("Content-Type", "application/json")
                    .DELETE()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("DELETE All Fires " + response.body());

        } catch (IOException | InterruptedException e) {
            System.out.println("DELETE All Fires Response: " + e.getMessage());
        }
    }

}
