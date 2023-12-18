import netscape.javascript.JSObject;
import org.apache.commons.text.StringEscapeUtils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.*;
import java.time.LocalDate;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ThreadLocalRandom;

public class Main {
    public static void main(String[] args) throws Exception {
        //Generate fire stations
        FireStation[] fireStations = new FireStation[6];

        fireStations[0] = new FireStation(1, "Fire Station 1", 45.778840, 4.878460);
        fireStations[1] = new FireStation(2, "Fire Station 2", 45.762779, 4.843930);
        fireStations[2] = new FireStation(3, "Fire Station 3", 45.746849, 4.825790);
        fireStations[3] = new FireStation(4, "Fire Station 4", 45.731660, 4.828440);
        fireStations[4] = new FireStation(5, "Fire Station 5", 45.765872, 4.905116);
        fireStations[5] = new FireStation(6, "Fire Station 6", 45.783848, 4.821030);

        //Generate firefighters
        int randomFireFighterNumber = (int) (Math.random() * (100 - 50)) + 50;

        FireFighter[] fireFighters = new FireFighter[randomFireFighterNumber];

        for (int i = 0; i < randomFireFighterNumber; i++) {
            URL url = new URL("https://api.namefake.com/french-france/random");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.connect();

            InputStreamReader responseStream = new InputStreamReader((InputStream) con.getContent());
            BufferedReader br = new BufferedReader(responseStream);

            String jsObject = br.readLine();
            String name = jsObject.substring(jsObject.indexOf("name") + 7, jsObject.indexOf("address") - 3);
            String cleanName = StringEscapeUtils.unescapeJava(name);
            String dateOfBirth = jsObject.substring(jsObject.indexOf("birth_data") + 13, jsObject.indexOf("phone_h") - 3);
            LocalDate cleanDateOfBirth = LocalDate.parse(dateOfBirth);
            String grade = FireFighterGrade.values()[(int) (Math.random() * (3))].toString();

            fireFighters[i] = new FireFighter(i, cleanName, cleanDateOfBirth, grade, fireStations[(int) (Math.random() * (6 - 1)) + 1]);
            System.out.println(fireFighters[i]);
        }

        //Generate trucks
        int randomTruckNumber = (int) (Math.random() * (100 - 50)) + 50;

        Truck[] trucks = new Truck[randomTruckNumber];

        for (int i = 0; i < randomTruckNumber; i++) {
            long minDay = LocalDate.of(1970, 1, 1).toEpochDay();
            long maxDay = LocalDate.of(2015, 12, 31).toEpochDay();
            long randomDay = ThreadLocalRandom.current().nextLong(minDay, maxDay);
            LocalDate randomDate = LocalDate.ofEpochDay(randomDay);
            String licensePlate = "AA-" + (int) ((i + 10) * (999 - 100)) + 100 + "-BB";

            trucks[i] = new Truck(licensePlate, randomDate, TruckType.values()[(int) (Math.random() * (3))].toString(), fireStations[(int) (Math.random() * (6 - 1)) + 1]);
            System.out.println(trucks[i]);
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

                Thread.sleep(500);
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
