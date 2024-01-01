package firefighter;

import fireStation.FireStation;
import org.apache.commons.text.StringEscapeUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;

public class FirefighterInitializer {

    public static Firefighter[] initialize(FireStation[] fireStations) {
        if (fireStations.length == 0) {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request;
            HttpResponse<String> response;

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
                    Firefighter[] firefighters = new Firefighter[jsonFirefighters.length()];

                    for (int i = 0; i < jsonFirefighters.length(); i++) {
                        String name = jsonFirefighters.getJSONObject(i).getString("name");
                        String dateOfBirth = jsonFirefighters.getJSONObject(i).getString("birthDate");
                        LocalDate cleanDateOfBirth = LocalDate.parse(dateOfBirth);
                        String grade = jsonFirefighters.getJSONObject(i).getString("grade");

                        int fireStationId = jsonFirefighters.getJSONObject(i).getInt("fireStationId");
                        String cleanName = StringEscapeUtils.unescapeJava(name);
                        String cleanGrade = StringEscapeUtils.unescapeJava(grade);

                        firefighters[i] = new Firefighter(i, cleanName, cleanDateOfBirth, cleanGrade, fireStations[fireStationId - 1]);
                        System.out.println("GET Firefighter: " + firefighters[i]);
                    }
                    return firefighters;
                }
                else {
                    int randomFirefighterNumber = (int) (Math.random() * 200);
                    Firefighter[] firefighters = new Firefighter[randomFirefighterNumber];
                    for (int i = 1; i < firefighters.length; i++) {
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

                        firefighters[i] = new Firefighter(i, cleanName, cleanDateOfBirth, grade, fireStations[(int) (Math.random() * (fireStations.length - 1)) + 1]);
                        firefighters[i].postFirefighter();
                    }
                    return firefighters;
                }
            } catch (IOException | InterruptedException e) {
                System.out.println("GET Firefighter: " + e.getMessage());
            }
        }
        return new Firefighter[0];
    }
}
