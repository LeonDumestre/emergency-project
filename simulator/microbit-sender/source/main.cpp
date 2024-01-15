#include "MicroBit.h"
#include "aes.hpp"

#define MICROBIT_ID 0001
#define MICROBIT_DEST 1000

MicroBit uBit;
uint8_t key[16] = "LaCleAES";

/**
 * Ajoute la source est la destination au message passé en paramètre.
 */
void addHeader(uint8_t *data)
{
    string str_id = to_string(MICROBIT_ID);
    string str_dest = to_string(MICROBIT_DEST);

    string s = str_id + ":" + str_dest + (char *)data;
    memcpy(data, s.c_str(), 240);
}

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

    uBit.display.scroll("INIT");

    while (true)
    {
        if (uBit.serial.rxBufferedSize() > 0)
        {
            uBit.display.scroll("S");
            // Réception du message passé via UART et copie dans une châine de charactère.
            ManagedString s = uBit.serial.readUntil(";");
            strcat((char *)data, (char *)s.toCharArray());

            // Ajoute le header au message
            addHeader(data, strlen((char *)data));

            // Chiffre puis envoie le code reçu
            for (int i = 0; i < 15; ++i)
            {
                AES_ECB_encrypt(&ctx, data + (i * 16));
            }
            uBit.radio.datagram.send(PacketBuffer(data, 240));

            // Réinitialisation du buffer
            memset(data, 0, sizeof(data));
        }

        uBit.sleep(50);
    }

    release_fiber();
}
