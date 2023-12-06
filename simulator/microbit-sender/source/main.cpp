#include "MicroBit.h"
#include <string>

MicroBit uBit;

string serial_msg;

void onSerialReceive(MicroBitEvent) {
    serial_msg = uBit.serial.readUntil("~").toCharArray();
    serial_msg.erase(remove(serial_msg.begin(), serial_msg.end(), '~'), serial_msg.end());
    uBit.radio.datagram.send(serial_msg.c_str());
}


int main() {
    uBit.init();

    uBit.serial.setRxBufferSize(uBit.serial.getRxBufferSize());
    uBit.serial.eventOn("~");

    uBit.messageBus.listen(MICROBIT_ID_SERIAL, MICROBIT_SERIAL_EVT_DELIM_MATCH, onSerialReceive);
    
    uBit.radio.enable();
    uBit.radio.setGroup(28);

    while(true) {
        uBit.sleep(10000);
    }

    release_fiber();
}