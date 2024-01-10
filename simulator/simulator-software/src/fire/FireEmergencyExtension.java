package fire;

import fire.FireEmergencyExtension;
import operation.Operation;

public class FireEmergencyExtension {

    protected int linkedEmergencyFireId;
    protected Operation operation;

    protected FireEmergencyExtension() {
        this.linkedEmergencyFireId = -1;
        this.operation = null;
    }

    public FireEmergencyExtension(int linkedEmergencyFireId, Operation operation) {
        this.linkedEmergencyFireId = linkedEmergencyFireId;
        this.operation = operation;
    }

    public int getLinkedEmergencyFireId() {
        return linkedEmergencyFireId;
    }

    public void setLinkedEmergencyFireId(int linkedEmergencyFireId) {
        this.linkedEmergencyFireId = linkedEmergencyFireId;
    }

    public Operation getOperation() {
        return operation;
    }

    public void setOperation(Operation operation) {
        this.operation = operation;
    }

    public boolean isLinkedToEmergencyFire() {
        return this.linkedEmergencyFireId != -1;
    }

    public boolean hasOperation() {
        return this.operation != null;
    }
}