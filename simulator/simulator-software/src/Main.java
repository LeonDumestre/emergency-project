import fire.Fire;
import fire.FireEmergencyExtension;
import fire.FireRepository;
import fireStation.FireStation;
import fireStation.FireStationInitializer;
import firefighter.Firefighter;
import firefighter.FirefighterInitializer;
import operation.Operation;
import operation.OperationRepository;
import sensor.Sensor;
import sensor.SensorInitializer;
import truck.Truck;
import truck.TruckInitializer;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import static java.lang.Thread.sleep;

public class Main {
    public static void main(String[] args) throws Exception {
        //Generate fire stations
        FireStation[] fireStations = FireStationInitializer.initialize();

        //Generate firefighters
        FirefighterInitializer.initialize(fireStations);

        //Generate trucks
        TruckInitializer.initialize(fireStations);

        //Generate sensors
        SensorInitializer.initialize();

        List<Fire> fires = new ArrayList<Fire>();

        while (true) {
            List<FireEmergencyExtension> emergencyFires = List.of(FireRepository.getEmergencyFires());
            fires = Fire.completeWithEmergencyFires(fires, emergencyFires);
            fires = Fire.generate(fires);
            fires = Fire.updateAll(fires);

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
        catch (SQLException | InterruptedException err)
        {
            err.printStackTrace();
        }
    }
}
