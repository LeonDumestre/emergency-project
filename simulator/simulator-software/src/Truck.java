import java.time.LocalDate;

public class Truck {
    private String plateNumber;
    private LocalDate dateOfAcquisition;
    String truckType;
    private FireStation fireStation;

    public Truck(String plateNumber, LocalDate dateOfAcquisition, String truckType, FireStation fireStation) {
        this.plateNumber = plateNumber;
        this.dateOfAcquisition = dateOfAcquisition;
        this.truckType = truckType;
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

    public void setFireStation(FireStation fireStation) {
        this.fireStation = fireStation;
    }

    @Override
    public String toString() {
        return "Truck{" +
                "plateNumber=" + plateNumber +
                ", dateOfAcquisition=" + dateOfAcquisition +
                ", truckType=" + truckType +
                ", fireStation=" + fireStation +
                '}';
    }
}
