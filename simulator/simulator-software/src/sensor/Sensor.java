package sensor;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Sensor {
    private double latitude;
    private double longitude;

    public Sensor(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String postSensor(String url){
        HttpClient client = HttpClient.newHttpClient();
        String json = "{\"latitude\":" + this.getLatitude() + ",\"longitude\":" + this.getLongitude() + "}";
        System.out.println("POST Sensor: " + json);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("POST Sensor: " + response.body());
            return response.body();
        } catch (IOException | InterruptedException e) {
            System.out.println("POST Sensor: " + e.getMessage());
        }

        return null;
    }

    @Override
    public String toString() {
        return "Sensor{" +
                "latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}
