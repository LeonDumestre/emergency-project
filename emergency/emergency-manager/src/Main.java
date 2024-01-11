import fire.Fire;
import fire.FireInitializer;
import fireStation.FireStation;
import fireStation.FireStationInitializer;
import firefighter.Firefighter;
import firefighter.FirefighterInitializer;
import operation.Operation;
import operation.OperationInitializer;
import operation.OperationRepository;
import truck.Truck;
import truck.TruckInitializer;

import java.lang.reflect.Array;
import java.util.ArrayList;

import static java.lang.Thread.sleep;

public class Main {
    public static void main(String[] args) throws Exception {
        //Get fire stations
        FireStation[] fireStations = FireStationInitializer.initialize();

        //Get firefighters
        Firefighter[] firefighters = FirefighterInitializer.initialize(fireStations);

        //Get trucks
        Truck[] trucks = TruckInitializer.initialize(fireStations);

        while (true) {
            //Get fires
            Fire[] fires = FireInitializer.initialize();

            //Get operations
            ArrayList<Operation> operations = OperationInitializer.initialize(fires, fireStations, firefighters, trucks);

            for (Fire fire : fires) {
                boolean operationExist = false;

                if (operations.isEmpty()) {
                    operations.add(OperationRepository.createOperation(fire, operations, fireStations, trucks, firefighters));
                } else {
                    for (Operation operation : operations) {
                        if (operation.getFireId() == fire.getId()) {
                            operationExist = true;
                            break;
                        }
                    }
                    if (!operationExist) {
                        operations.add(OperationRepository.createOperation(fire, operations, fireStations, trucks, firefighters));
                    }
                }
            }
            sleep(3000);
        }
    }
}
