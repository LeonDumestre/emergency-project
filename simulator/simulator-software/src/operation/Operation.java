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
    private LocalDateTime returnStart;

    public Operation(int id, LocalDateTime start, OperationStatus status) {
        this.id = id;
        this.start = start;
        this.status = status;
    }

    public Operation(int id, LocalDateTime start, OperationStatus status, LocalDateTime returnStart) {
        this.id = id;
        this.start = start;
        this.status = status;
        this.returnStart = returnStart;
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

    public void updateStatus(Fire fire) {
        this.notifyOnSite();
        this.notifyReturning(fire.getIntensity());
        this.notifyOnFinished();
    }

    public void notifyOnSite() {
        System.out.println("START+ : " + this.start.plusHours(1).plusMinutes(1));
        System.out.println("NOW    : " + LocalDateTime.now());
        if (this.status == OperationStatus.ON_ROAD && this.start.plusHours(1).plusMinutes(1).isBefore(LocalDateTime.now())) {
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
        System.out.println("RETURN+ : " + this.returnStart.plusHours(1).plusMinutes(1));
        System.out.println("NOW     : " + LocalDateTime.now());
        if (this.status == OperationStatus.RETURNING && this.returnStart.plusHours(1).plusMinutes(3).isBefore(LocalDateTime.now())) {
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
