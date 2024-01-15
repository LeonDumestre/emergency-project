package truck;

import fireStation.FireStation;
import operation.Operation;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Objects;

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

    public boolean isAvailable(ArrayList<Operation> operations){
        if (!this.truckType.equals("FPT")) {
            return false;
        }
        for (Operation operation : operations) {
            if (Objects.equals(operation.getTruckPlateNumber(), this.getPlateNumber())) {
                return false;
            }
        }
        return true;

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
