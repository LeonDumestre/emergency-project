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

import java.util.ArrayList;
import java.util.Objects;

import static java.lang.Thread.sleep;

public class Main {
    public static void main(String[] args) throws Exception {
        //Get fire stations
        ArrayList<FireStation> fireStations = FireStationInitializer.initialize();

        //Get firefighters
        Firefighter[] firefighters = FirefighterInitializer.initialize(fireStations);

        //Get trucks
        Truck[] trucks = TruckInitializer.initialize(fireStations);

        while (true) {
            //Get fires
            Fire[] fires = FireInitializer.initialize();

            //Get operations
            ArrayList<Operation> operations = OperationInitializer.initialize(fires, fireStations, firefighters, trucks);

            //Create operations for new fires
            for (Fire fire : fires) {
                boolean operationExist = false;

                if (operations.isEmpty() && fire.getIntensity() > 0) {
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

//            //Delete operations for finished fires
//            System.out.println(operations);
//            for (Operation operation : operations) {
//                boolean fireExist = false;
//
//                for (Fire fire : fires) {
//                    if (operation.getFireId() == fire.getId()) {
//                        fireExist = true;
//                        break;
//                    }
//                }
//                if (!fireExist && Objects.equals(operation.getStatus(), "FINISHED")) {
//                    OperationRepository.removeOperation(operation.getId());
//                }
//            }
            sleep(3000);
        }
    }
}
