import java.time.LocalDate;
import java.util.Date;
import java.util.Locale;

public class FireFighter {
    private int id;
    private String Name;
    private LocalDate birthDate;
    private String grade;
    private FireStation fireStation;

    public FireFighter(int id, String name, LocalDate birthDate, String grade, FireStation fireStation) {
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
    @Override
    public String toString() {
        return "FireFighter{" +
                "id=" + id +
                ", name='" + Name + '\'' +
                ", birthDate=" + birthDate +
                ", grade='" + grade + '\'' +
                ", fireStation=" + fireStation +
                '}';
    }
}
