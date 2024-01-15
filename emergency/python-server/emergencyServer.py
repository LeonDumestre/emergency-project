import time
import socket
import socketserver
import serial
import threading
import sqlite3
import re
import json
import paho.mqtt.client as mqtt
import emergencyDataManager as dm

# send serial message
SERIALPORT = "/dev/tty.usbmodem1202"
BAUDRATE = 115200
ser = serial.Serial()

mutex = threading.Lock()
mqqt_mutex = threading.Lock()

# MQTT Setup
MQTT_BROKER_URL    = "mqtt.eclipseprojects.io"
MQTT_PUBLISH_TOPIC = "sensors"

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

# Publishing thread
def MQTTSendSensor(data_str, mqqt_mutex):
    data = json.loads(data_str[:-1].decode("utf-8"))

    firesInData = []
    for fire in data.get("vals"):
        element = dm.FireByCaptor(fire.get("id"), fire.get("int"), fire.get("dist"))
        firesInData.append(element)

    sensor = dm.Captor(data.get("id"), str(firesInData), data.get("lat"), data.get("lon"))

    mqqt_mutex.acquire()
    payload = {"id": sensor.id, "length": len(sensor.values),"values": sensor.values}
    mqttc.publish(MQTT_PUBLISH_TOPIC, str(payload))
    mqqt_mutex.release()
    print("Message <" + sensor + "> sent to MQTT broker.")


# Main program logic follows:
if __name__ == '__main__':
    initUART()
    print('Press Ctrl-C to quit.')

    mqttc = mqtt.Client()
    mqttc.connect(MQTT_BROKER_URL)

    try:
        print("Server started")
        while ser.isOpen():
            try:
                # lock the serial because we need it not to flush our input
                mutex.acquire()
                data_str = ser.read_until(b';')
                ser.flush()
                mutex.release()

                dm.receivedData(json.loads(data_str[:-1].decode("utf-8")))

                mqttthread = threading.Thread(target=MQTTSendSensor, args=(data_str, mqqt_mutex))
                mqttthread.start()

            except Exception as e:
                print("Error while reading from serial port: {}".format(e))

    except (KeyboardInterrupt, SystemExit):
        ser.close()
        exit()