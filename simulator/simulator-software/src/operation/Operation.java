package operation;

import fire.Fire;

import java.time.LocalDateTime;

public class Operation {
    private int id;
    private LocalDateTime start;
    private OperationStatus status;
    private int fireId;
    private int[] firefighterIds;
    private String[] trucksPlates;
    private LocalDateTime returnStart;

    public Operation(int id, LocalDateTime start, OperationStatus status, int fireId, int[] firefighterIds, String[] trucksPlates) {
        this.id = id;
        this.start = start;
        this.status = status;
        this.fireId = fireId;
        this.firefighterIds = firefighterIds;
        this.trucksPlates = trucksPlates;
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

    public int getFireId() {
        return fireId;
    }

    public int[] getFirefighterIds() {
        return firefighterIds;
    }

    public String[] getTrucksPlates() {
        return trucksPlates;
    }

    public void notifyOnSite() {
        if (this.status == OperationStatus.ON_ROAD && this.start.plusMinutes(10).isAfter(LocalDateTime.now())) {
            this.status = OperationStatus.ON_SITE;
            OperationRepository.notifyOnSite(this.id);
        }
    }

    public void notifyOnReturn(Fire fire) {
        if (this.status == OperationStatus.ON_SITE && fire.getIntensity() == 0) {
            this.status = OperationStatus.ON_RETURN;
            this.returnStart = LocalDateTime.now();
            OperationRepository.notifyOnReturn(this.id);
        }
    }

    public boolean canRemove() {
        if (this.status == OperationStatus.ON_RETURN && this.returnStart.plusMinutes(10).isAfter(LocalDateTime.now())) {
            OperationRepository.remove(this.id);
            return true;
        }
        return false;
    }
}
