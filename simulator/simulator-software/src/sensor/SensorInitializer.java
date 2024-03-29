package sensor;

import org.json.JSONArray;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

public class SensorInitializer {

    private static final String emUrl = "http://localhost:3010/sensors";
    private static final String simulatorUrl = "http://localhost:3110/sensors";

    public static List<Sensor> initialize() {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request;
        HttpResponse<String> response;

        List<Sensor> generatedSensors = generateSensors();

        try{
            // Verify sensors already exist in simulator
            request = HttpRequest.newBuilder()
                    .uri(URI.create(simulatorUrl))
                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200 && response.body().length() > 2) {
                System.out.println("Sensors in simulator already exist");
            } else {
                System.out.println("Sensors in simulator don't exist");
                for (Sensor sensor : generatedSensors) {
                    sensor.postSensor(simulatorUrl);
                }
            }
        } catch (IOException | InterruptedException e) {
            System.out.println("GET Simulator Sensors: " + e.getMessage());
        }
        return generatedSensors;
    }

    private static List<Sensor> generateSensors() {
        List<Sensor> sensors = new ArrayList<>();
        double topLeftCornerLatitude = 45.788812;
        double topLeftCornerLongitude = 4.8;
        double latitudeGap = 0.008;
        double longitudeGap = 0.01;

        for (int i = 0; i < 10; i++){
            for (int j = 0; j < 13; j++){
                sensors.add(new Sensor(topLeftCornerLatitude - i*latitudeGap, topLeftCornerLongitude + j*longitudeGap));
            }
        }
        return sensors;
    }

    private static Sensor[] parseJsonSensors(String json) {
        JSONArray jsonSensors = new JSONArray(json);
        Sensor[] sensors = new Sensor[jsonSensors.length()];

        for (int i = 0; i < jsonSensors.length(); i++) {
            double latitude = jsonSensors.getJSONObject(i).getDouble("latitude");
            double longitude = jsonSensors.getJSONObject(i).getDouble("longitude");
            sensors[i] = new Sensor(latitude, longitude);
            System.out.println("GET Simulator Sensor: " + sensors[i].toString());
        }
        return sensors;
    }
}
