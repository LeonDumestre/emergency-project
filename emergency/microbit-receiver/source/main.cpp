#include "MicroBit.h"
#include "crypt.hpp"
#include <string>

MicroBit uBit;

const uint8_t key[16] = { 0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c };

ManagedString managed_string;

void onRadioReceive(MicroBitEvent) {
    managed_string = uBit.radio.datagram.recv();
    uBit.serial.printf("%s~", decrypt((char*)managed_string.toCharArray(), (uint8_t*)key));
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