// #include "MicroBit.h"
// #include "crypt.hpp"
// #include <string>

// MicroBit uBit;

// const uint8_t key[16] = { 0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c };
// const int ONE_SECOND_IN_MS = 1000;

// string serial_msg;

// void transit(const char* input){
//     uBit.radio.datagram.send(encrypt((char*)input, (uint8_t*)key));
// }

// void onSerialReceive(MicroBitEvent) {
//     serial_msg = uBit.serial.readUntil("~").toCharArray();
//     serial_msg.erase(remove(serial_msg.begin(), serial_msg.end(), '~'), serial_msg.end());
//     transit(serial_msg.c_str());
//     uBit.serial.printf("#");
// }


// int main() {
//     uBit.init();

//     uBit.serial.setRxBufferSize(255);
//     uBit.serial.eventOn("~");

//     uBit.messageBus.listen(MICROBIT_ID_SERIAL, MICROBIT_SERIAL_EVT_DELIM_MATCH, onSerialReceive);
    
//     uBit.radio.enable();
//     uBit.radio.setGroup(28);

//     while(true) {
//         uBit.sleep(1 * ONE_SECOND_IN_MS);
//     }

//     release_fiber();
// }

#include "MicroBit.h"
#include "aes.hpp"

MicroBit uBit;
uint8_t key[16] = "Jeremy";

int main()
{
    // Initialise the micro:bit runtime.
    uBit.init();
    uBit.radio.enable();
    uBit.radio.setGroup(80);
    uBit.serial.setRxBufferSize(240);

    // Initialisation de l'outil de chiffrement et du buffer utilisé pour la réception de message via UART.
    struct AES_ctx ctx;
    AES_init_ctx(&ctx, key);
    uint8_t data[240] = "";
    memset(data, 0, sizeof(data));

    while (true)
    {
        if (uBit.serial.rxBufferedSize() > 0)
        {
            uBit.display.scroll("OUI");
            // Réception du message passé via UART et copie dans une châine de charactère.
            ManagedString s = uBit.serial.readUntil(";");
            strcat((char *)data, (char *)s.toCharArray());

            // Chiffre puis envoie le code reçu
            for (int i = 0; i < 15; ++i)
            {
                AES_ECB_encrypt(&ctx, data + (i * 16));
            }
            uBit.radio.datagram.send((char *)data);

            // Réinitialisation du buffer
            memset(data, 0, sizeof(data));
        }

        uBit.sleep(50);
    }

    release_fiber();
}
