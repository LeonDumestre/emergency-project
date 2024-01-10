package operation;

import fire.Fire;
import firefighter.Firefighter;
import truck.Truck;

import java.time.LocalDateTime;

public class Operation {
    private final int id;
    private final LocalDateTime start;
    private OperationStatus status;
    private Fire fire;
    private Firefighter[] firefighters;
    private Truck[] trucks;
    private LocalDateTime returnStart;

    public Operation(int id, LocalDateTime start, OperationStatus status) {
        this.id = id;
        this.start = start;
        this.status = status;
    }

    public Operation(int id, LocalDateTime start, OperationStatus status, Fire fire, Firefighter[] firefighters, Truck[] trucks) {
        this.id = id;
        this.start = start;
        this.status = status;
        this.fire = fire;
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

    public Fire getFire() {
        return fire;
    }
    public void setFire(Fire fire) {
        this.fire = fire;
    }

    public Firefighter[] getFirefighters() {
        return firefighters;
    }

    public Truck[] getTrucks() {
        return trucks;
    }

    public void updateStatus() {
        if (this.status == OperationStatus.ON_ROAD) {
            this.notifyOnSiteIfArrived();
        } else if (this.status == OperationStatus.ON_SITE) {
            this.notifyOnReturnIfFinished();
        } else if (this.status == OperationStatus.RETURNING) {
            this.removeIfArrived();
        }
    }

    public void notifyOnSiteIfArrived() {
        if (this.status == OperationStatus.ON_ROAD && this.start.plusMinutes(10).isAfter(LocalDateTime.now())) {
            this.status = OperationStatus.ON_SITE;
            OperationRepository.notifyOnSite(this.id);
        }
    }

    public void notifyOnReturnIfFinished() {
        if (this.status == OperationStatus.ON_SITE && this.fire.getIntensity() == 0) {
            this.status = OperationStatus.RETURNING;
            this.returnStart = LocalDateTime.now();
            OperationRepository.notifyOnReturn(this.id);
        }
    }

    public void removeIfArrived() {
        if (this.status == OperationStatus.RETURNING && this.returnStart.plusMinutes(10).isAfter(LocalDateTime.now())) {
            OperationRepository.remove(this.id);
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
