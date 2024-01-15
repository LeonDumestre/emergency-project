"""
MQTT Smart temperature Sensor
"""

import time
import paho.mqtt.client as mqtt
from faker import Faker

# let's connect to the MQTT broker
MQTT_BROKER_URL    = "mqtt.eclipseprojects.io"
MQTT_PUBLISH_TOPIC = "sensors"

mqttc = mqtt.Client()
mqttc.connect(MQTT_BROKER_URL)

# Init faker our fake data provider
fake = Faker()

value = [{"distance": 781.5258540578316, "id": 36, "intensity": 1}]

# Infinite loop of fake data sent to the Broker
while True:
    id = fake.random_int(min=0, max=5)
    number_of_fire = fake.random_int(min=0, max=3)
    values = []
    for i in range(number_of_fire):
        values.append(value)
    payload = {"id": id, "length": number_of_fire, "values": values}
    mqttc.publish(MQTT_PUBLISH_TOPIC, str(payload))
    print(f"Published new measurement - ID: {id}, Number of fire: {number_of_fire}, Values: {values}")
    time.sleep(1)