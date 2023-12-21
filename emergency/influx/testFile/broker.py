"""
MQTT Smart temperature Sensor
"""

import time

import paho.mqtt.client as mqtt
from faker import Faker

# let's connect to the MQTT broker
MQTT_BROKER_URL    = "mqtt.eclipseprojects.io"
MQTT_PUBLISH_TOPIC = "temperature"

mqttc = mqtt.Client()
mqttc.connect(MQTT_BROKER_URL)

# Init faker our fake data provider
fake = Faker()

# Infinite loop of fake data sent to the Broker
while True:
    for i in range(1, 60+1):
        temperature = fake.random_int(min=0, max=30)
        payload = {"id": i, "temperature": temperature}
        mqttc.publish(MQTT_PUBLISH_TOPIC, str(payload))
        print(f"Published new measurement - ID: {i}, Temperature: {temperature}")
        time.sleep(0.1)