package fire;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;

public class Fire {
    private int id;
    private double latitude;
    private double longitude;
    private int intensity;

    public Fire(int id, double latitude, double longitude, int intensity) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.intensity = intensity;
    }

    public int getId() {
        return id;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public int getIntensity() {
        return intensity;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public void setIntensity(int intensity) {
        this.intensity = intensity;
    }

    public void postFire() {
        HttpClient client = HttpClient.newHttpClient();

        try {
            LocalDateTime date = LocalDateTime.now();
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("uuuu-MM-dd'T'HH:mm:ssX");
            String cleanDate = date.atOffset(java.time.ZoneOffset.UTC).format(dtf);
            String json = "{\"latitude\":" + this.getLatitude() + ",\"longitude\":" + this.getLongitude() + ",\"intensity\":" + this.getIntensity() + ",\"triggerAt\":\"" + cleanDate + "\"}";

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(java.net.URI.create("http://localhost:3110/fires"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            System.out.println("POST Fire: " + json);

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("POST Fire: " + response.body());

        } catch (IOException | InterruptedException e) {
            System.out.println("POST Fire: " + e.getMessage());
        }
    }

    @Override
    public String toString() {
        return "Fire{" +
                "id=" + id +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", intensity=" + intensity +
                '}';
    }
}