package fire;

import operation.Operation;
import operation.OperationRepository;
import operation.OperationStatus;

import java.util.List;

public class Fire {
    private final int id;
    private final double latitude;
    private final double longitude;
    private int intensity;
    private final static float generationProbability = 0.1f;
    private final static double topLeftCornerLatitude = 45.788812;
    private final static double topLeftCornerLongitude = 4.8;
    private final static double latitudeGap = 0.008;
    private final static double longitudeGap = 0.01;

    public Fire(int id, double latitude, double longitude, int intensity) {
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

    public static Fire generate(List<Fire> fires) {
        Fire[] emergencyFires = FireRepository.getEmergencyFires();

        if (emergencyFires == null || fires.size() > emergencyFires.length) {
            return null;
        }

        if (Math.random() < generationProbability) {
            double latitude = topLeftCornerLatitude - Math.random() * 9 * latitudeGap;
            double longitude = topLeftCornerLongitude + Math.random() * 12 * longitudeGap;

            return FireRepository.createFire(latitude, longitude, 1);
        }
        return null;
    }

    public void update() {
        Operation operation = FireRepository.getOperationByFire(this.id);

        if (operation == null || operation.getStatus() == OperationStatus.ON_ROAD) {
            this.increaseIntensity();
            return;
        }

        operation.setFire(this);
        this.decreaseIntensity();

        operation.notifyOnReturnIfFinished();
    }

    private void increaseIntensity() {
        float increaseProbability = 0.05f;

        if (this.intensity < 9 && Math.random() < increaseProbability) {
            this.setIntensity(this.getIntensity() + 1);
            FireRepository.updateIntensity(this.id, this.intensity);
        }
    }

    private void decreaseIntensity() {
        float decreaseProbability = 0.05f;

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