package fire;

public class Fire {
    private final int id;
    private final double latitude;
    private final double longitude;
    private int intensity;

    public Fire(int id, double latitude, double longitude, int intensity) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.intensity = intensity;
    }

    public int getId() {
        return id;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public int getIntensity() {
        return intensity;
    }

    public void setIntensity(int intensity) {
        this.intensity = intensity;
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