public class FireStations {
    private FireStation[] fireStations;

    public FireStations() {
        this.fireStations = new FireStation[6];
    }

    public FireStation[] getFireStations() {
        return fireStations;
    }

    public void setFireStations(FireStation[] fireStations) {
        this.fireStations = fireStations;
    }

    public void initializeFireStations() {

        this.fireStations[0] = new FireStation(1, "Fire Station 1", 45.778840, 4.878460);
        this.fireStations[1] = new FireStation(2, "Fire Station 2", 45.762779, 4.843930);
        this.fireStations[2] = new FireStation(3, "Fire Station 3", 45.746849, 4.825790);
        this.fireStations[3] = new FireStation(4, "Fire Station 4", 45.731660, 4.828440);
        this.fireStations[4] = new FireStation(5, "Fire Station 5", 45.765872, 4.905116);
        this.fireStations[5] = new FireStation(6, "Fire Station 6", 45.783848, 4.821030);

        for (int i = 0; i < fireStations.length; i++) {
            fireStations[i].postFireStation();
        }
    }
}
