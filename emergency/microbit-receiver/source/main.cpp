#include "MicroBit.h"
#include <string>

MicroBit uBit;

ManagedString managed_string;

void onRadioReceive(MicroBitEvent) {
    managed_string = uBit.radio.datagram.recv();
    uBit.serial.printf("%s~", (char*)managed_string.toCharArray());
}

int main() {
    uBit.init();

    uBit.messageBus.listen(MICROBIT_ID_RADIO, MICROBIT_RADIO_EVT_DATAGRAM, onRadioReceive);
    
    uBit.radio.enable();
    uBit.radio.setGroup(28);

    while(true) {
        uBit.sleep(8000);
    }

    release_fiber();
}