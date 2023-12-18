#include "MicroBit.h"
#include "crypt.hpp"
#include <string>

MicroBit uBit;

const uint8_t key[16] = { 0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c };

string serial_msg;

void transit(const char* input){
    uBit.radio.datagram.send(encrypt((char*)input, (uint8_t*)key));
}

void onSerialReceive(MicroBitEvent) {
    serial_msg = uBit.serial.readUntil("~").toCharArray();
    serial_msg.erase(remove(serial_msg.begin(), serial_msg.end(), '~'), serial_msg.end());
    transit(serial_msg.c_str());
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