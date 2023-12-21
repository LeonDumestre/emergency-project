import org.apache.commons.text.StringEscapeUtils;

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
                        .uri(java.net.URI.create("http://localhost:3110/trucks"))
                        .header("Content-Type", "application/json")
                        .GET()
                        .build();
                response = client.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.body().length() > 2) {
                    System.out.println("Trucks already exist");
                    String[] jsonTrucks = response.body().split("},");
                    this.trucks = new Truck[jsonTrucks.length];

                    for (int i = 0; i < jsonTrucks.length; i++) {
                        String licensePlate = jsonTrucks[i].split(",")[0].split(":")[1];
                        String cleanLicensePlate = licensePlate.split("\"")[1].split("\"")[0].replace("\\", "");
                        String date = jsonTrucks[i].split(",")[1].split(":")[1];
                        LocalDate cleanDate = LocalDate.parse(date.split("\"")[1].split("\"")[0].replace("\\", ""));
                        String type = jsonTrucks[i].split(",")[2].split(":")[1];
                        String cleanType = type.split("\"")[1].split("\"")[0].replace("\\", "");
                        int capacity = Integer.parseInt(jsonTrucks[i].split(",")[3].split(":")[1].split("}")[0]);
                        if (i == jsonTrucks.length - 1) {
                            int fireStationId = Integer.parseInt(jsonTrucks[i].split(",")[4].split(":")[1].split("}")[0]);
                            this.trucks[i] = new Truck(cleanLicensePlate, cleanDate, cleanType, capacity,  fireStations.getFireStations()[fireStationId - 1]);
                        } else {
                            int fireStationId = Integer.parseInt(jsonTrucks[i].split(",")[4].split(":")[1]);
                            this.trucks[i] = new Truck(cleanLicensePlate, cleanDate, cleanType, capacity,  fireStations.getFireStations()[fireStationId - 1]);
                        }
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
