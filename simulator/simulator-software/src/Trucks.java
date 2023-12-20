import java.time.LocalDate;
import java.util.concurrent.ThreadLocalRandom;

public class Trucks {
    private int randomTruckNumber = (int) (Math.random() * 30);
    private Truck[] trucks;
    private FireStations fireStations = new FireStations();

    public Trucks(FireStations fireStations) {
        this.trucks = new Truck[randomTruckNumber];
        this.fireStations = fireStations;
    }

    public Truck[] getTrucks() {
        return trucks;
    }

    public FireStations getFireStations() {
        return fireStations;
    }

    public void setTrucks(Truck[] trucks) {
        this.trucks = trucks;
    }

    public void setFireStations(FireStations fireStations) {
        this.fireStations = fireStations;
    }

    public void initializeTrucks() {
        if (this.fireStations.getFireStations() != null){
            for (int i = 0; i < this.randomTruckNumber; i++) {
                long minDay = LocalDate.of(1970, 1, 1).toEpochDay();
                long maxDay = LocalDate.of(2015, 12, 31).toEpochDay();
                long randomDay = ThreadLocalRandom.current().nextLong(minDay, maxDay);
                LocalDate randomDate = LocalDate.ofEpochDay(randomDay);
                String licensePlate = "AA-" + (int) ((i + 10) * (999 - 100)) + 100 + "-BB";

                trucks[i] = new Truck(licensePlate, randomDate, TruckType.values()[(int) (Math.random() * (3))].toString(), fireStations.getFireStations()[(int) (Math.random() * (6 - 1)) + 1]);
                trucks[i].postTruck();
            }
        }
    }
}
