package fire;

import java.util.ArrayList;
import java.util.List;

import operation.Operation;
import operation.OperationStatus;

public class Fire extends FireEmergencyExtension {
    private final int id;
    private final double latitude;
    private final double longitude;
    private int intensity;

    private final static float generationProbability = 0.2f;
    private final static float increaseProbability = 0.1f;
    private final static float decreaseProbability = 0.4f;

    private final static double topLeftCornerLatitude = 45.788812;
    private final static double topLeftCornerLongitude = 4.8;
    private final static double latitudeGap = 0.008;
    private final static double longitudeGap = 0.01;

    public Fire(int id, double latitude, double longitude, int intensity) {
        super();
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.intensity = intensity;
        this.linkedEmergencyFireId = -1;
    }

    public Fire(int id, double latitude, double longitude, int intensity, int linkedEmergencyFireId, Operation operation) {
        super(linkedEmergencyFireId, operation);
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.intensity = intensity;
    }

    public int getId() {
        return id;
    }

    public int getIntensity() {
        return intensity;
    }
    
    public void setIntensity(int intensity) {
        this.intensity = intensity;
    }

    public static List<Fire> generate(List<Fire> fires) {
        // check if all fires have an operation
        for (Fire fire : fires) {
            if (!fire.hasOperation()) return fires;
        }

        if (Math.random() < generationProbability) {
            double latitude = topLeftCornerLatitude - Math.random() * 9 * latitudeGap;
            double longitude = topLeftCornerLongitude + Math.random() * 12 * longitudeGap;

            Fire newFire = FireRepository.createFire(latitude, longitude, 1);
            if (newFire == null) return fires;
            fires.add(newFire);
        }
        return fires;
    }

    public static List<Fire> completeWithEmergencyFires(List<Fire> fires, List<FireEmergencyExtension> emergencyFires) {
        if (fires == null) fires = new ArrayList<>();
        if (fires.isEmpty() || emergencyFires == null || emergencyFires.isEmpty()) return fires;

        List<Fire> unlinkedFires = new ArrayList<>();
        for (Fire fire : fires) {
            if (!fire.isLinkedToEmergencyFire()) {
                unlinkedFires.add(fire);
                continue;
            }
            if (fire.hasOperation()) continue;

            for (FireEmergencyExtension emergencyFire : emergencyFires) {
                boolean isLinkedWith = emergencyFire.getLinkedEmergencyFireId() == fire.linkedEmergencyFireId;
                if (fire.isLinkedToEmergencyFire() && fire.hasOperation() && isLinkedWith) {
                    emergencyFires.remove(emergencyFire);
                    break;
                }

                if (fire.isLinkedToEmergencyFire() && isLinkedWith) {
                    fire.setOperation(emergencyFire.getOperation());
                    emergencyFires.remove(emergencyFire);
                    break;
                }
            }
        }

        if (!unlinkedFires.isEmpty() && !emergencyFires.isEmpty()) return fires;
        fires = Fire.linkToEmergencyFires(unlinkedFires, emergencyFires);

        return fires;
    }

    public static List<Fire> linkToEmergencyFires(List<Fire> unlinkedFires, List<FireEmergencyExtension> emergencyFires) {
        for (FireEmergencyExtension emergencyFire : emergencyFires) {
            for (Fire fire : unlinkedFires) {
                if (fire.isLinkedToEmergencyFire()) continue;

                fire.setLinkedEmergencyFireId(emergencyFire.getLinkedEmergencyFireId());
                fire.setOperation(emergencyFire.getOperation());
                emergencyFires.remove(emergencyFire);
                break;
            }
        }
        return unlinkedFires;
    }

    public static List<Fire> updateAll(List<Fire> fires) {
        for (Fire fire : fires) {
            fire.update();
        }
        return fires;
    }

    public void update() {
        if (!this.hasOperation() || operation.getStatus() == OperationStatus.ON_ROAD) {
            this.increaseIntensity();
            return;
        }

        if (this.hasOperation() && operation.getStatus() == OperationStatus.FINISHED) {
            return;
        }

        this.decreaseIntensity();
        operation.updateStatus();
    }

    private void increaseIntensity() {
        if (this.intensity < 9 && Math.random() < increaseProbability) {
            this.setIntensity(this.getIntensity() + 1);
            FireRepository.updateIntensity(this.id, this.intensity);
        }
    }

    private void decreaseIntensity() {
        if (this.intensity > 0 && Math.random() < decreaseProbability) {
            this.setIntensity(this.getIntensity() - 1);
            FireRepository.updateIntensity(this.id, this.intensity);
        }
    }

    @Override
    public String toString() {
        return "Fire{" +
                "id=" + id +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", intensity=" + intensity +
                '}';
    }
}