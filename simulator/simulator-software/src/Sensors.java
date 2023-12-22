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
                System.out.println("Sensors in EM already exist");
                String[] jsonSensors = response.body().split("},");
                this.sensors = new Sensor[jsonSensors.length];

                for (int i = 0; i < jsonSensors.length; i++) {
                    double latitude = Double.parseDouble(jsonSensors[i].split(",")[0].split(":")[1]);
                    double longitude = Double.parseDouble(jsonSensors[i].split(",")[1].split(":")[1]);
                    this.sensors[i] = new Sensor(latitude, longitude);
                    System.out.println("GET EM Sensor: " + this.sensors[i].toString());
                }
            }
            else {
                System.out.println("Sensors EM don't exist");
                this.sensors = new Sensor[60];
                double longitudeGap = 0.0193976;
                double latitudeGap = 0.0077021;
                for (int i = 0; i < 6; i++){
                    for (int j = 0; j < 10; j++){
                        this.sensors[i*10+j] = new Sensor(45.788453 - i*latitudeGap, 4.788435 + j*longitudeGap);
                        this.sensors[i*10+j].postSensor();
                    }
                }
            }
        }
        catch (IOException | InterruptedException e) {
            System.out.println("GET in EM Sensors: " + e.getMessage());
        }

        try {
            request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:3010/sensors/"))
                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if ((response.body().length() > 2)) {
                System.out.println("Sensors in simulator already exist");
                String[] jsonSensors = response.body().split("},");
                this.sensors = new Sensor[jsonSensors.length];

                for (int i = 0; i < jsonSensors.length; i++) {
                    double latitude = Double.parseDouble(jsonSensors[i].split(",")[1].split(":")[1]);
                    if (i == jsonSensors.length - 1) {
                        double longitude = Double.parseDouble(jsonSensors[i].split(",")[2].split(":")[1].split("}")[0]);
                        this.sensors[i] = new Sensor(latitude, longitude);
                    } else {
                        double longitude = Double.parseDouble(jsonSensors[i].split(",")[2].split(":")[1]);
                        this.sensors[i] = new Sensor(latitude, longitude);
                    }
                    System.out.println("GET Simulator Sensor: " + this.sensors[i].toString());
                }
            } else {
                System.out.println("Sensors in simulator don't exist");
                this.sensors = new Sensor[60];
                double topLeftCornerLatitude = 45.788812;
                double topLeftCornerLongitude = 4.788435;
                double topRightCornerLongitude = 4.900015;
                double bottomLeftCornerLatitude = 45.711432;
                double latitudeGap = (topLeftCornerLatitude - bottomLeftCornerLatitude) / 6;
                double longitudeGap = (topRightCornerLongitude - topLeftCornerLongitude) / 10;

                for (int i = 0; i < 6; i++){
                    for (int j = 0; j < 10; j++){
                        this.sensors[i*10+j] = new Sensor(topLeftCornerLatitude - i*latitudeGap, topLeftCornerLongitude + j*longitudeGap);
                        this.sensors[i*10+j].postSensor();
                    }
                }
            }
        } catch (IOException | InterruptedException e) {
            System.out.println("GET Simulator Sensors: " + e.getMessage());
        }
    }
}
