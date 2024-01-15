#include "MicroBit.h"
#include "aes.hpp"

#define MICROBIT_ID 1000

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
 * Fonction appelée lors de la réception de datagram via radio.
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

    // Suppression du header et vérification de la destination du message.
    string s = removeHeader((char *)myjson);

    // Envoi du texte déchiffré en serial à la passerelle.
    uBit.serial.send(s);
    free(myjson);
}

/*
 * Fonction supprimant le début de la chaîne et vérifiant si le message est bien destiné à la passerelle.
 */
string removeHeader(string s)
{
    // use MICROBIT_ID variable to string to compare with
    string str_id = to_string(MICROBIT_ID);

    if (s.substr(6, 9) == str_id)
    {
        return s.substr(9) + ";";
    }
    return "";
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
