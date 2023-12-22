package firefighter;

import fireStation.FireStations;
import org.apache.commons.text.StringEscapeUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;

public class Firefighters {

    private int randomFirefighterNumber = (int) (Math.random() * 200);
    private Firefighter[] firefighters;
    private FireStations fireStations = new FireStations();

    public Firefighters(FireStations fireStations) {
        this.firefighters = new Firefighter[randomFirefighterNumber];
        this.fireStations = fireStations;
    }

    public Firefighter[] getFirefighters() {
        return firefighters;
    }

    public FireStations getFireStations() {
        return fireStations;
    }

    public void setFirefighters(Firefighter[] firefighters) {
        this.firefighters = firefighters;
    }

    public void setFireStations(FireStations fireStations) {
        this.fireStations = fireStations;
    }

    public void initializeFirefighters() {
        if (this.fireStations.getFireStations() != null){
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = null;
            HttpResponse<String> response = null;

            // Verify firefighter already exist
            try{
                request = HttpRequest.newBuilder()
                        .uri(URI.create("http://localhost:3010/firefighters/"))
                        .header("Content-Type", "application/json")
                        .GET()
                        .build();

                response = client.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200 && response.body().length() > 2) {
                    System.out.println("Firefighter already exist");
                    JSONArray jsonFirefighters = new JSONArray(response.body());
                    this.firefighters = new Firefighter[jsonFirefighters.length()];

                    for (int i = 0; i < jsonFirefighters.length(); i++) {
                        String name = jsonFirefighters.getJSONObject(i).getString("name");
                        String dateOfBirth = jsonFirefighters.getJSONObject(i).getString("birthDate");
                        LocalDate cleanDateOfBirth = LocalDate.parse(dateOfBirth);
                        String grade = jsonFirefighters.getJSONObject(i).getString("grade");

                        int fireStationId = jsonFirefighters.getJSONObject(i).getInt("fireStationId");
                        String cleanName = StringEscapeUtils.unescapeJava(name);
                        String cleanGrade = StringEscapeUtils.unescapeJava(grade);

                        this.firefighters[i] = new Firefighter(i, cleanName, cleanDateOfBirth, cleanGrade, fireStations.getFireStations()[fireStationId - 1]);
                        System.out.println("GET Firefighter: " + this.firefighters[i]);
                    }
                }
                else {
                    for (int i = 1; i < this.randomFirefighterNumber; i++) {
                        request = HttpRequest.newBuilder()
                                .uri(URI.create("https://api.namefake.com/french-france"))
                                .header("Content-Type", "application/json")
                                .GET()
                                .build();

                        response = client.send(request, HttpResponse.BodyHandlers.ofString());

                        JSONObject jsonFirefighter = new JSONObject(response.body());
                        String name = jsonFirefighter.getString("name");
                        String grade = FirefighterGrade.values()[(int) (Math.random() * (FirefighterGrade.values().length - 1)) + 1].toString();
                        String dateOfBirth = jsonFirefighter.getString("birth_data");

                        String cleanName = StringEscapeUtils.unescapeJava(name);
                        LocalDate cleanDateOfBirth = LocalDate.parse(dateOfBirth);

                        firefighters[i] = new Firefighter(i, cleanName, cleanDateOfBirth, grade, fireStations.getFireStations()[(int) (Math.random() * (6 - 1)) + 1]);
                        firefighters[i].postFirefighter();
                    }
                }
            } catch (IOException | InterruptedException e) {
                System.out.println("GET Firefighter: " + e.getMessage());
            }
        }
    }
}
