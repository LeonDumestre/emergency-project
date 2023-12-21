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
                    .uri(URI.create("http://localhost:3110/sensors/"))
                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.body().length() > 2) {
                System.out.println("Sensors already exist");
                String[] jsonSensors = response.body().split("},");
                this.sensors = new Sensor[jsonSensors.length];

                for (int i = 0; i < jsonSensors.length; i++) {
                    double latitude = Double.parseDouble(jsonSensors[i].split(",")[0].split(":")[1]);
                    double longitude = Double.parseDouble(jsonSensors[i].split(",")[1].split(":")[1]);
                    this.sensors[i] = new Sensor(latitude, longitude);
                    System.out.println("GET Sensor: " + this.sensors[i].toString());
                }
            }
            else {
                System.out.println("Sensors don't exist");
                this.sensors = new Sensor[60];
                double longitudeGap = 0.0077021;
                double latitudeGap = 0.0193976;
                for (int i = 0; i < 6; i++){
                    for (int j = 0; j < 10; j++){
                        this.sensors[i*10+j] = new Sensor(45.788453 + j*latitudeGap, 4.788435 + i*longitudeGap);
                        this.sensors[i*10+j].postSensor();
                    }
                }
            }
        }
        catch (IOException | InterruptedException e) {
            System.out.println("GET Sensors: " + e.getMessage());
        }

        try {
            request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:3010/sensors/"))
                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println(response.body());

            if (!(response.body().length() > 2)) {
                System.out.println("Sensors don't exist");
                this.sensors = new Sensor[60];
                double longitudeGap = 0.0077021;
                double latitudeGap = 0.0193976;
                for (int i = 0; i < 6; i++){
                    for (int j = 0; j < 10; j++){
                        this.sensors[i*10+j] = new Sensor(45.788453 + j*latitudeGap, 4.788435 + i*longitudeGap);
                        this.sensors[i*10+j].postSensor();
                    }
                }
            }
        } catch (IOException | InterruptedException e) {
            System.out.println("GET Sensors: " + e.getMessage());
        }
    }
}
