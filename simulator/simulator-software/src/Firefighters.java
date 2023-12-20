import org.apache.commons.text.StringEscapeUtils;

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
                        .uri(URI.create("http://localhost:3110/firefighters/"))
                        .header("Content-Type", "application/json")
                        .GET()
                        .build();

                response = client.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.body().length() > 2) {
                    System.out.println("Firefighter already exist");
                    String[] jsonFirefighters = response.body().split("},");
                    this.firefighters = new Firefighter[jsonFirefighters.length];

                    for (int i = 0; i < jsonFirefighters.length; i++) {
                        /*int id = Integer.parseInt(jsonFirefighters[i].split(",")[0].split(":")[1]);
                        String name = jsonFirefighters[i].split(",")[1].split(":")[1];
                        System.out.println(name);
                        String dateOfBirthString = jsonFirefighters[i].split(",")[3].split(":")[1];
                        System.out.println(dateOfBirthString);
                        //LocalDate dateOfBirth = LocalDate.parse(dateOfBirthString);
                        String grade = jsonFirefighters[i].split(",")[3].split(":")[1];
                        System.out.println(grade);
                        String fireStationString = jsonFirefighters[i].split(",")[4].split(":")[1];
                        System.out.println(fireStationString);
                        int fireStationId = Integer.parseInt(fireStationString.split("}")[0]);
                        FireStation fireStation = this.fireStations.getFireStations()[fireStationId - 1];*/
                        //this.firefighters[i] = new Firefighter(id, name, dateOfBirth, grade, fireStation);
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

                        String jsObject = response.body();
                        String name = jsObject.substring(jsObject.indexOf("name") + 7, jsObject.indexOf("address") - 3);
                        String cleanName = StringEscapeUtils.unescapeJava(name);
                        String dateOfBirth = jsObject.substring(jsObject.indexOf("birth_data") + 13, jsObject.indexOf("phone_h") - 3);
                        LocalDate cleanDateOfBirth = LocalDate.parse(dateOfBirth);
                        String grade = FirefighterGrade.values()[(int) (Math.random() * (3))].toString();

                        firefighters[i] = new Firefighter(i, cleanName, cleanDateOfBirth, grade, fireStations.getFireStations()[(int) (Math.random() * (6 - 1)) + 1]);
                        firefighters[i].postFirefighter();
                    }
                }
            } catch (Exception e) {
                System.out.println("GET Firefighter: " + e.getMessage());
            }
        }
    }
}
