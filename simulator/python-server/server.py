import time
import serial
import threading
import numpy as np
import dataManager as dm
import json

LAST_VALS = ""
REGEX_DATA = r"^\d+\.\d+\;\d+~$"

# send serial message
SERIALPORT = "/dev/ttyACM0"
BAUDRATE = 115200
ser = serial.Serial()

# captor data (map id=>value)
# Générer des données aléatoires pour 60 capteurs
nombre_capteurs = 60
capteurs_ids = range(1, nombre_capteurs + 1)
capteurs_valeurs = 0

# Créer le dictionnaire id=>valeur
donnees_capteurs = dict(zip(capteurs_ids, capteurs_valeurs))

mutex = threading.Lock()

def initUART():
    # ser = serial.Serial(SERIALPORT, BAUDRATE)
    ser.port = SERIALPORT
    ser.baudrate = BAUDRATE
    ser.bytesize = serial.EIGHTBITS  # number of bits per bytes
    ser.parity = serial.PARITY_NONE  # set parity check: no parity
    ser.stopbits = serial.STOPBITS_ONE  # number of stop bits
    ser.timeout = None  # block read

    # ser.timeout = 0             #non-block read
    # ser.timeout = 2              #timeout block read
    ser.xonxoff = False  # disable software flow control
    ser.rtscts = False  # disable hardware (RTS/CTS) flow control
    ser.dsrdtr = False  # disable hardware (DSR/DTR) flow control
    # ser.writeTimeout = 0     #timeout for write
    print('Starting Up Serial Monitor')
    try:
        ser.open()
    except serial.SerialException:
        print("Serial {} port not available".format(SERIALPORT))
        exit()


def sendUARTMessage(msg):
    # lock the serial to not erase the infos
    mutex.acquire()
    ser.write(str.encode(msg))
    time.sleep(1) # ensure that the microbit has some time to read the buffer
    mutex.release()
    print("Message <" + msg + "> sent to micro-controller.")

def makeItJSON(captor):
    return json.dumps(captor, default=lambda o: o.__dict__, sort_keys=True, indent=4)



# Main program logic follows:
if __name__ == '__main__':
    initUART()
    print('Press Ctrl-C to quit.')

    try:
        print("Server started")
        while ser.isOpen():
            try:
                sendUARTMessage("a~")

            except Exception as e:
                print("Error while reading from serial port: {}".format(e))

    except (KeyboardInterrupt, SystemExit):
        ser.close()
        exit()