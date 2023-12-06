# Documentation de la MicroBit Passerelle

## Introduction

Cette documentation fournit des informations sur le code de la passerelle MicroBit, qui sert de pont entre un serveur (connecté via le port série) et une autre MicroBit (via un réseau radio).

## Installation

Lance Yotta :
```bash
source /sync/Module_Dev_app_mobile/yotta/bin/activate
```

Build puis run le code :
```bash
make build
make install
```

## Configuration

Le code initialise le MicroBit, configure les écouteurs d'événements nécessaires et paramètre le groupe radio. La boucle principale du programme assure un fonctionnement continu avec une pause de 1 secondes à chaque itération.

## Initialisation

Le MicroBit est initialisé avec `uBit.init()`, et un message "INIT" est affiché sur la matrice de LEDs du MicroBit.

## Communication Série

La communication série est configurée pour déclencher des événements lorsqu'un caractère tilde (~) est reçu. Le code définit la taille du tampon de réception et écoute les événements série en conséquence.

Lorsqu'un message est reçu par la liaison série, la fonction `onSerialReceive` s'éxécute.
Le message série reçu est lu jusqu'à ce qu'un caractère tilde (~) soit rencontré, puis le message est envoyé via la radio après chiffrement.

## Communication Radio

La radio est activée et configurée pour fonctionner dans le groupe 28.

Lorsqu'un message est reçu par radio, la fonction `onRadioReceive` est lancée.
La fonction transit est responsable du chiffrement du message d'entrée et de son envoi via la radio. Les messages radio sont reçus dans la fonction onRadioReceive, déchiffrés et affichés en sortie série.

## Chiffrement

Le chiffrement est mis en œuvre à l'aide d'une clé prédéfinie. La clé est un tableau de 128 bits (16 octets) défini dans le code. Les fonctions encrypt et decrypt sont utilisées pour chiffrer et déchiffrer les messages, respectivement.
