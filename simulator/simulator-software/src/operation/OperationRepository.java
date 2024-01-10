package operation;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;

public class OperationRepository {
    private static final String emergencyUrl = "http://localhost:3010/operations";

    public static Operation[] getOperations() {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request;
        HttpResponse<String> response;

        try{
            request = HttpRequest.newBuilder()
                    .uri(URI.create(emergencyUrl))
                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200 && response.body().length() > 2) {
                System.out.println("GET Emergency Operations: " + response.body());
                return parseOperations(response.body());
            }
        } catch (IOException | InterruptedException e) {
            System.out.println("GET Emergency Operations: " + e.getMessage());
        }
        return null;
    }

    public static void notifyOnSite(int id) {
        HttpClient client = HttpClient.newHttpClient();

        try {
            System.out.println("PUT Operation ON SITE");
            String url = emergencyUrl + "/" + id + "/live/on-site";
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json")
                    .PUT(HttpRequest.BodyPublishers.noBody())
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("PUT Operation: " + response.statusCode());
        } catch (IOException | InterruptedException e) {
            System.out.println("PUT Operation: " + e.getMessage());
        }
    }

    public static void notifyOnReturn(int id) {
        HttpClient client = HttpClient.newHttpClient();

        try {
            System.out.println("PUT Operation ON RETURN");
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(emergencyUrl + "/" + id + "/live/on-return"))
                    .header("Content-Type", "application/json")
                    .PUT(HttpRequest.BodyPublishers.noBody())
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("PUT Operation: " + response.statusCode());
        } catch (IOException | InterruptedException e) {
            System.out.println("PUT Operation: " + e.getMessage());
        }
    }

    public static void remove(int id) {
        HttpClient client = HttpClient.newHttpClient();

        try {
            System.out.println("DELETE Operation");
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(emergencyUrl + "/" + id))
                    .header("Content-Type", "application/json")
                    .DELETE()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("PUT Operation: " + response.statusCode());
        } catch (IOException | InterruptedException e) {
            System.out.println("PUT Operation: " + e.getMessage());
        }
    }

    public static Operation[] parseOperations(String json) {
        JSONArray jsonOperations = new JSONArray(json);
        Operation[] operations = new Operation[jsonOperations.length()];

        for (int i = 0; i < jsonOperations.length(); i++) {
            operations[i] = parseOperation(jsonOperations.getJSONObject(i));
        }
        return operations;
    }

    public static Operation parseOperation(JSONObject jsonOperation) {
        int id = jsonOperation.getInt("id");
        LocalDateTime start = LocalDateTime.parse(jsonOperation.getString("start"));
        OperationStatus status = OperationStatus.valueOf(jsonOperation.getString("status"));

        Operation operation = new Operation(id, start, status);
        System.out.println("GET Operation: " + operation);

        return operation;
    }
}
