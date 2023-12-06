import java.sql.*;

public class Main {
    public static void main(String[] args) throws Exception {
        test();
    }

    public static void test() throws Exception {
        Class.forName("org.postgresql.Driver");
        String url = "jdbc:postgresql://localhost:5432/emergency_database";

        // Create two distinct connections, one for the notifier
        // and another for the listener to show the communication
        // works across connections although this example would
        // work fine with just one connection.

        Connection lConn = DriverManager.getConnection(url, "admin", "password");
        Connection nConn = DriverManager.getConnection(url, "admin", "password");

        // Create two threads, one to issue notifications and
        // the other to receive them.

        Listener listener = new Listener(lConn);
        //Notifier notifier = new Notifier(nConn);
        listener.start();
        //notifier.start();
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