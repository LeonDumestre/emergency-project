package operation;

import firefighter.Firefighter;
import truck.Truck;

import java.time.LocalDateTime;
import java.util.ArrayList;

public class Operation {
    private int id;
    private int fireId;
    private ArrayList<Integer> fireFighterId;
    private ArrayList<String> truckPlateNumber;
    private LocalDateTime startDate;

    public Operation(int id, int fireId, ArrayList<Integer> fireFighterId, ArrayList<String> truckPlateNumber, LocalDateTime startDate) {
        this.id = id;
        this.fireId = fireId;
        this.fireFighterId = fireFighterId;
        this.truckPlateNumber = truckPlateNumber;
        this.startDate = startDate;
    }

    public int getId() {
        return id;
    }
    public int getFireId() {
        return fireId;
    }
    public ArrayList<Integer> getFireFighterId() {
        return fireFighterId;
    }
    public ArrayList<String> getTruckPlateNumber() {
        return truckPlateNumber;
    }
    public LocalDateTime getStart_date() {
        return startDate;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setFireId(int fireId) {
        this.fireId = fireId;
    }
    public void setFireFighterId(ArrayList<Integer> fireFighterId) {
        this.fireFighterId = fireFighterId;
    }
    public void setTruckPlateNumber(ArrayList<String> truckPlateNumber) {
        this.truckPlateNumber = truckPlateNumber;
    }
    public void setStart_date(LocalDateTime start_date) {
        this.startDate = start_date;
    }

    @Override
    public String toString() {
        return "Operation{" +
                "id=" + id +
                ", fireId=" + fireId +
                ", fireFighterId=" + fireFighterId +
                ", truckPlateNumber=" + truckPlateNumber +
                ", start_date=" + startDate +
                '}';
    }
}
