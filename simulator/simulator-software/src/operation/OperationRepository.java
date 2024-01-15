package operation;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
            System.out.println("PUT Operation RETURNING");
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(emergencyUrl + "/" + id + "/live/returning"))
                    .header("Content-Type", "application/json")
                    .PUT(HttpRequest.BodyPublishers.noBody())
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("PUT Operation: " + response.statusCode());
        } catch (IOException | InterruptedException e) {
            System.out.println("PUT Operation: " + e.getMessage());
        }
    }

    public static void notifyFinished(int id) {
        HttpClient client = HttpClient.newHttpClient();

        try {
            System.out.println("PUT Operation FINISHED");
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(emergencyUrl + "/" + id + "/live/finished"))
                    .header("Content-Type", "application/json")
                    .PUT(HttpRequest.BodyPublishers.noBody())
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
        LocalDateTime start = LocalDateTime.parse(jsonOperation.getString("start"), DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX"));
        OperationStatus status = OperationStatus.valueOf(jsonOperation.getString("status"));

        Operation operation = null;
        LocalDateTime returnStart = null;
        System.out.println("RETURN START: " + jsonOperation.isNull("returnStart"));
        if (jsonOperation.isNull("returnStart")) {
            operation = new Operation(id, start, status);
        } else {
            returnStart = LocalDateTime.parse(jsonOperation.getString("returnStart"), DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX"));
            operation = new Operation(id, start, status, returnStart);
        }

        System.out.println("GET Operation: " + operation);

        return operation;
    }
}
