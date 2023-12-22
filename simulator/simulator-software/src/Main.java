import fireStation.FireStations;
import firefighter.Firefighters;
import fire.Fire;
import truck.Trucks;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.*;

import static java.lang.Thread.sleep;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = null;
        HttpResponse<String> response = null;

        //Generate fire stations
        FireStations fireStations = new FireStations();
        fireStations.initializeFireStations();

        //Generate firefighters
        Firefighters firefighters = new Firefighters(fireStations);
        firefighters.initializeFirefighters();

        //Generate trucks
        Trucks trucks = new Trucks(fireStations);
        trucks.initializeTrucks();

        //Generate sensors
        sensor.Sensors sensors = new sensor.Sensors();
        sensors.initializeSensors();

        //Generate fires
        Fire[] fires = new Fire[0];
        double topLeftCornerLatitude = 45.788812;
        double topLeftCornerLongitude = 4.8;
        double latitudeGap = 0.008;
        double longitudeGap = 0.01;

        float fireProbability = 0.05f;
        int idFire = 0;

        while(true) {
            if (Math.random() < fireProbability) {
                //Generate fire
                double latitude = topLeftCornerLatitude - (double) (Math.random() * 9) * latitudeGap;
                double longitude = topLeftCornerLongitude + (double) (Math.random() * 12) * longitudeGap;

                fires[idFire] = new Fire(idFire, latitude, longitude, 1);

                //Send fire to the web server
                fires[idFire].postFire();
            }
            sleep(3000);
        }
    }

    public static void test() throws Exception {
        Class.forName("org.postgresql.Driver");
        String url = "jdbc:postgresql://localhost:5432/emergency_database";

        Connection lConn = DriverManager.getConnection(url, "admin", "password");

        Listener listener = new Listener(lConn);
        listener.start();
    }
}

class Listener extends Thread
{
    private Connection conn;
    private org.postgresql.PGConnection pgconn;

    Listener(Connection conn) throws SQLException
    {
        this.conn = conn;
        this.pgconn = conn.unwrap(org.postgresql.PGConnection.class);
        Statement stmt = conn.createStatement();
        stmt.execute("LISTEN new_operation");
        stmt.close();
    }

    public void run()
    {
        try
        {
            while (true)
            {
                org.postgresql.PGNotification notifications[] = pgconn.getNotifications();

                // If this thread is the only one that uses the connection, a timeout can be used to
                // receive notifications immediately:
                // org.postgresql.PGNotification notifications[] = pgconn.getNotifications(10000);

                if (notifications != null)
                {
                    for (int i=0; i < notifications.length; i++){
                        System.out.println("Got notification: " + notifications[i].getName());
                        System.out.println("Got notification parameters: " + notifications[i].getParameter());
                    }
                }

                // wait a while before checking again for new
                // notifications

                sleep(500);
            }
        }
        catch (SQLException sqle)
        {
            sqle.printStackTrace();
        }
        catch (InterruptedException ie)
        {
            ie.printStackTrace();
        }
    }
}
