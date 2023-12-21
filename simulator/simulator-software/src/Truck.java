import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;

public class Truck {
    private String plateNumber;
    private LocalDate dateOfAcquisition;
    private String truckType;
    private int capacity;
    private FireStation fireStation;

    public Truck(String plateNumber, LocalDate dateOfAcquisition, String truckType, int capacity, FireStation fireStation) {
        this.plateNumber = plateNumber;
        this.dateOfAcquisition = dateOfAcquisition;
        this.truckType = truckType;
        this.capacity = capacity;
        this.fireStation = fireStation;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public LocalDate getDateOfAcquisition() {
        return dateOfAcquisition;
    }

    public String getTruckType() {
        return truckType;
    }

    public int getCapacity() {
        return capacity;
    }

    public FireStation getFireStation() {
        return fireStation;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public void setDateOfAcquisition(LocalDate dateOfAcquisition) {
        this.dateOfAcquisition = dateOfAcquisition;
    }

    public void setTruckType(String truckType) {
        this.truckType = truckType;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public void setFireStation(FireStation fireStation) {
        this.fireStation = fireStation;
    }

    public void postTruck(){
        HttpClient client = HttpClient.newHttpClient();

        try {
            String json = "{\"plate\":\"" + this.getPlateNumber() + "\",\"acquisition\":\"" + this.getDateOfAcquisition() + "\",\"type\":\"" + this.getTruckType() + "\",\"fireStationId\":" + this.getFireStation().getId() + "}";
            System.out.println("POST Truck: " + json);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:3110/trucks"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("Response Code: " + response.statusCode());
            System.out.println("Response Body: " + response.body());

        } catch (IOException | InterruptedException e) {
            System.out.println("POST Truck: " + e.getMessage());
        }
    }

    @Override
    public String toString() {
        return "Truck{" +
                "plateNumber=" + plateNumber +
                ", dateOfAcquisition=" + dateOfAcquisition +
                ", truckType=" + truckType +
                ", capacity=" + capacity +
                ", fireStation=" + fireStation +
                '}';
    }
}
