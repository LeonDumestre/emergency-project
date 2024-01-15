package operation;

import fire.Fire;
import fire.FireRepository;
import firefighter.Firefighter;
import truck.Truck;

import java.time.LocalDateTime;

public class Operation {
    private final int id;
    private final LocalDateTime start;
    private OperationStatus status;
    private Firefighter[] firefighters;
    private Truck[] trucks;

    public Operation(int id, LocalDateTime start, OperationStatus status) {
        this.id = id;
        this.start = start;
        this.status = status;
    }

    public Operation(int id, LocalDateTime start, OperationStatus status, Firefighter[] firefighters, Truck[] trucks) {
        this.id = id;
        this.start = start;
        this.status = status;
        this.firefighters = firefighters;
        this.trucks = trucks;
    }

    public int getId() {
        return id;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public OperationStatus getStatus() {
        return status;
    }

    public Firefighter[] getFirefighters() {
        return firefighters;
    }

    public Truck[] getTrucks() {
        return trucks;
    }

    public void updateStatus(Fire fire) {
        this.notifyOnSite();
        this.notifyReturning(fire.getIntensity());
        this.notifyOnFinished();
    }

    public void notifyOnSite() {
        System.out.println("START+ : " + this.start.plusMinutes(3));
        System.out.println("NOW : " + LocalDateTime.now());
        if (this.status == OperationStatus.ON_ROAD && this.start.plusHours(1).plusMinutes(2).isAfter(LocalDateTime.now())) {
            this.status = OperationStatus.ON_SITE;
            OperationRepository.notifyOnSite(this.id);
        }
    }

    public void notifyReturning(int intensity){
        if (this.status == OperationStatus.ON_SITE && intensity == 0) {
            this.status = OperationStatus.RETURNING;
            OperationRepository.notifyOnReturn(this.id);
        }
    }

    public void notifyOnFinished() {
        if (this.status == OperationStatus.RETURNING && this.start.plusHours(1).plusMinutes(4).isAfter(LocalDateTime.now())) {
            OperationRepository.notifyFinished(this.id);
            FireRepository.remove(this.id);
        }
    }

    @Override
    public String toString() {
        return "Operation{" +
                "id=" + id +
                ", start=" + start +
                ", status=" + status +
                '}';
    }
}
