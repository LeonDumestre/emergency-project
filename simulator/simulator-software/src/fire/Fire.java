package fire;

import java.util.ArrayList;
import java.util.List;

import operation.Operation;
import operation.OperationStatus;

public class Fire {
    private final int id;
    private final double latitude;
    private final double longitude;
    private int intensity;
    private Operation operation;

    private static float generationProbability = 0.2f;
    private final static float increaseProbability = 0.15f;
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
    }

    public Fire(int id, double latitude, double longitude, int intensity, Operation operation) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.intensity = intensity;
        this.operation = operation;
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

    public boolean hasOperation() {
        return operation != null;
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

            generationProbability = 0.05f;
        }
        return fires;
    }

    public static List<Fire> updateAll(List<Fire> fires) {
        for (Fire fire : fires) {
            fire.update();
        }
        return fires;
    }

    public void update() {
        if (this.hasOperation()) {
            operation.updateStatus(this);
        }

        if (!this.hasOperation() || operation.getStatus() == OperationStatus.ON_ROAD) {
            this.increaseIntensity();
            return;
        }

        if (this.hasOperation() && operation.getStatus() == OperationStatus.FINISHED) {
            return;
        }

        this.decreaseIntensity();
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