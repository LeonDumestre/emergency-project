package truck;

import fireStation.FireStations;
import org.apache.commons.text.StringEscapeUtils;
import org.json.JSONArray;
import truck.Truck;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.concurrent.ThreadLocalRandom;

public class Trucks {
    private int randomTruckNumber = (int) (Math.random() * 30);
    private Truck[] trucks;
    private FireStations fireStations = new FireStations();

    public Trucks(FireStations fireStations) {
        this.trucks = new Truck[randomTruckNumber];
        this.fireStations = fireStations;
    }

    public Truck[] getTrucks() {
        return trucks;
    }

    public FireStations getFireStations() {
        return fireStations;
    }

    public void setTrucks(Truck[] trucks) {
        this.trucks = trucks;
    }

    public void setFireStations(FireStations fireStations) {
        this.fireStations = fireStations;
    }

    public void initializeTrucks() {
        if (this.fireStations.getFireStations() != null){
            // Verify if trucks already exist
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = null;
            HttpResponse<String> response = null;

            try {
                request = HttpRequest.newBuilder()
                        .uri(java.net.URI.create("http://localhost:3010/trucks"))
                        .header("Content-Type", "application/json")
                        .GET()
                        .build();
                response = client.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200 && response.body().length() > 2) {
                    System.out.println("Trucks already exist");
                    JSONArray jsonTrucks = new JSONArray(response.body());
                    this.trucks = new Truck[jsonTrucks.length()];

                    for (int i = 0; i < jsonTrucks.length(); i++) {
                        String cleanLicensePlate = StringEscapeUtils.unescapeJson(jsonTrucks.getJSONObject(i).getString("plate"));
                        String cleanDate = StringEscapeUtils.unescapeJson(jsonTrucks.getJSONObject(i).getString("acquisition"));
                        String cleanType = StringEscapeUtils.unescapeJson(jsonTrucks.getJSONObject(i).getString("type"));
                        int capacity = jsonTrucks.getJSONObject(i).getInt("capacity");
                        int idFireStation = jsonTrucks.getJSONObject(i).getInt("fireStationId");

                        this.trucks[i] = new Truck(cleanLicensePlate, LocalDate.parse(cleanDate), cleanType, capacity, this.fireStations.getFireStations()[idFireStation - 1]);

                        System.out.println("GET Truck: " + this.trucks[i].toString());
                    }
                } else {
                    // Generate random trucks
                    for (int i = 0; i < this.randomTruckNumber; i++) {
                        long minDay = LocalDate.of(1970, 1, 1).toEpochDay();
                        long maxDay = LocalDate.of(2015, 12, 31).toEpochDay();
                        long randomDay = ThreadLocalRandom.current().nextLong(minDay, maxDay);
                        LocalDate randomDate = LocalDate.ofEpochDay(randomDay);
                        String licensePlate = "AA-" + (int) ((i + 10) * (999 - 100)) + 100 + "-BB";
                        int capacity = (int) (Math.random() * (100 - 1)) + 1;

                        trucks[i] = new Truck(licensePlate, randomDate, TruckType.values()[(int) (Math.random() * (3))].toString(), capacity ,fireStations.getFireStations()[(int) (Math.random() * (6 - 1)) + 1]);
                        trucks[i].postTruck();
                    }
                }
            } catch (IOException | InterruptedException e) {
                System.out.println("GET Trucks: " + e.getMessage());
            }
        }
    }
}
