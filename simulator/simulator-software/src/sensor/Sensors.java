package sensor;

import org.json.JSONArray;
import sensor.Sensor;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Sensors {
    private Sensor[] sensors;

    public Sensors() {}

    public Sensor[] getSensors() {
        return sensors;
    }

    public void setSensors(Sensor[] sensors) {
        this.sensors = sensors;
    }

    public void initializeSensors() {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = null;
        HttpResponse<String> response = null;

        // Verify sensors already exist
        try{
            request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:3010/sensors/"))
                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200 && response.body().length() > 2) {
                System.out.println("Sensors in EM already exist");
                JSONArray jsonSensors = new JSONArray(response.body());
                this.sensors = new Sensor[jsonSensors.length()];

                for (int i = 0; i < jsonSensors.length(); i++) {
                    double latitude = jsonSensors.getJSONObject(i).getDouble("latitude");
                    double longitude = jsonSensors.getJSONObject(i).getDouble("longitude");
                    this.sensors[i] = new Sensor(latitude, longitude);
                    System.out.println("GET EM Sensor: " + this.sensors[i].toString());
                }
            }
            else {
                System.out.println("Sensors EM don't exist");
                this.sensors = new Sensor[130];
                double topLeftCornerLatitude = 45.788812;
                double topLeftCornerLongitude = 4.8;
                double latitudeGap = 0.008;
                double longitudeGap = 0.01;
                for (int i = 0; i < 10; i++){
                    for (int j = 0; j < 13; j++){
                        this.sensors[i*10+j] = new Sensor(topLeftCornerLatitude - i*latitudeGap, topLeftCornerLongitude + j*longitudeGap);
                        this.sensors[i*10+j].postSensor("http://localhost:3010/sensors");
                    }
                }
            }
        }
        catch (IOException | InterruptedException e) {
            System.out.println("GET EM Sensors: " + e.getMessage());
        }

        try {
            request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:3110/sensors/"))
                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200 && response.body().length() > 2) {
                System.out.println("Sensors in simulator already exist");
                JSONArray jsonSensors = new JSONArray(response.body());
                this.sensors = new Sensor[jsonSensors.length()];

                for (int i = 0; i < jsonSensors.length(); i++) {
                    double latitude = jsonSensors.getJSONObject(i).getDouble("latitude");
                    double longitude = jsonSensors.getJSONObject(i).getDouble("longitude");
                    this.sensors[i] = new Sensor(latitude, longitude);
                    System.out.println("GET Simulator Sensor: " + this.sensors[i].toString());
                }
            } else {
                System.out.println("Sensors in simulator don't exist");
                this.sensors = new Sensor[130];
                double topLeftCornerLatitude = 45.788812;
                double topLeftCornerLongitude = 4.8;
                double latitudeGap = 0.008;
                double longitudeGap = 0.01;

                for (int i = 0; i < 10; i++){
                    for (int j = 0; j < 13; j++){
                        this.sensors[i*10+j] = new Sensor(topLeftCornerLatitude - i*latitudeGap, topLeftCornerLongitude + j*longitudeGap);
                        this.sensors[i*10+j].postSensor("http://localhost:3110/sensors");
                    }
                }
            }
        } catch (IOException | InterruptedException e) {
            System.out.println("GET Simulator Sensors: " + e.getMessage());
        }
    }
}
