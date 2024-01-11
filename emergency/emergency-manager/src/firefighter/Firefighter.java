package firefighter;

import fireStation.FireStation;
import operation.Operation;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.ArrayList;

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

    public boolean isAvailable(ArrayList<Operation> operations) {
        for (Operation operation : operations) {
            ArrayList<Integer> firefightersId = operation.getFireFighterId();
            for (int id : firefightersId) {
                if (id == this.id) {
                    return false;
                }
            }
        }
        return true;
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
