// #include "MicroBit.h"
// #include "crypt.hpp"
// #include <string>

// MicroBit uBit;

// const uint8_t key[16] = { 0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c };

// ManagedString managed_string;

// void onRadioReceive(MicroBitEvent) {
//     managed_string = uBit.radio.datagram.recv();
//     uBit.serial.printf("%s;", decrypt((char*)managed_string.toCharArray(), (uint8_t*)key));
// }

// int main() {
//     uBit.init();

//     uBit.messageBus.listen(MICROBIT_ID_RADIO, MICROBIT_RADIO_EVT_DATAGRAM, onRadioReceive);
    
//     uBit.radio.enable();
//     uBit.radio.setGroup(28);

//     release_fiber();
// }


#include "MicroBit.h"
#include "aes.hpp"

MicroBit uBit;
uint8_t key[16] = "LaCleAES";

/**
 * Déchiffre le texte passé en paramètre (le texte doit être d'une taille de 240 octets)
 */
void decrypt(uint8_t *encrypted_text)
{
    struct AES_ctx ctx;
    AES_init_ctx(&ctx, key);
    for (int i = 0; i < 15; ++i)
    {
        AES_ECB_decrypt(&ctx, encrypted_text + (i * 16));
    }
}

/**
 * Fonction appelé lors de la réception de detagram via radio.
 */
void onRadioReceive(MicroBitEvent)
{
    uBit.display.scroll("R");
    // Réception du datagram
    PacketBuffer pb = uBit.radio.datagram.recv();

    // Déclaration de la chaine de charactère et copie des informations reçus.
    uint8_t *myjson = (uint8_t *)malloc(240 * sizeof(uint8_t));
    memcpy(myjson, pb.getBytes(), 240);

    // Déchiffrement du texte
    decrypt(myjson);

    // Envoi du texte déchiffré en serial à la passerelle.
    uBit.serial.send(((char *)myjson));
    free(myjson);
}

int main()
{
    // Initialise the micro:bit runtime.
    uBit.init();
    uBit.messageBus.listen(MICROBIT_ID_RADIO, MICROBIT_RADIO_EVT_DATAGRAM, onRadioReceive);
    uBit.radio.enable();
    uBit.radio.setGroup(80);
    uBit.serial.setRxBufferSize(240);

    uBit.display.scroll("INIT");

    release_fiber();
}
