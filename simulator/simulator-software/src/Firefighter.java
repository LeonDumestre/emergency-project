import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;

public class Firefighter {
    private int id;
    private String Name;
    private LocalDate birthDate;
    private String grade;
    private FireStation fireStation;

    public Firefighter(int id, String name, LocalDate birthDate, String grade, FireStation fireStation) {
        this.id = id;
        this.Name = name;
        this.birthDate = birthDate;
        this.grade = grade;
        this.fireStation = fireStation;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return Name;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public String getGrade() {
        return grade;
    }

    public FireStation getFireStation() {
        return fireStation;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.Name = name;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public void setFireStation(FireStation fireStation) {
        this.fireStation = fireStation;
    }

    public void postFirefighter() {
        HttpClient client = HttpClient.newHttpClient();

        try {
            String json = "{\"id\":" + this.getId() + ",\"name\":\"" + this.getName() + "\",\"birthDate\":\"" + this.getBirthDate() + "\",\"grade\":\"" + this.getGrade() + "\",\"fireStation\":" + this.getFireStation().getId() + "}";
            System.out.println("POST Firefighter: " + json);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:3110/fire-fighters"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("Response Code: " + response.statusCode());
            System.out.println("Response Body: " + response.body());

        } catch (Exception e) {
            System.out.println("POST Firefighter: " + e);
        }
    }
    @Override
    public String toString() {
        return "Firefighter{" +
                "id=" + id +
                ", name='" + Name + '\'' +
                ", birthDate=" + birthDate +
                ", grade='" + grade + '\'' +
                ", fireStation=" + fireStation +
                '}';
    }
}
