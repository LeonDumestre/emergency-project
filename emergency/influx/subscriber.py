"""
MQTT subscriber - Listen to a topic and sends data to InfluxDB
"""

import os
from dotenv import load_dotenv
import paho.mqtt.client as mqtt
from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import ASYNCHRONOUS
import json

load_dotenv()  # take environment variables from .env.

# InfluxDB config
BUCKET = os.getenv('INFLUXDB_BUCKET')
client = InfluxDBClient(url=os.getenv('INFLUXDB_URL'),
                token=os.getenv('INFLUXDB_TOKEN'), org=os.getenv('INFLUXDB_ORG'))
write_api = client.write_api()

# MQTT broker config
MQTT_BROKER_URL    = "mqtt.eclipseprojects.io"
MQTT_PUBLISH_TOPIC = "temperature"

mqttc = mqtt.Client()
mqttc.connect(MQTT_BROKER_URL)

def on_connect(client, userdata, flags, rc):
    """ The callback for when the client connects to the broker."""
    print("Connected with result code "+str(rc))

    # Subscribe to a topic
    client.subscribe(MQTT_PUBLISH_TOPIC)

def on_message(client, userdata, msg):
    """ The callback for when a PUBLISH message is received from the server."""
    print(msg.topic+" "+str(msg.payload))

    try:
        # Decode the JSON payload
        ready = str(msg.payload.decode('utf-8')).replace("'", "\"")
        data = json.loads(ready)
        
        # Extract ID and temperature from the payload
        sensor_id = data.get("id")
        temperature = data.get("temperature")

        if sensor_id is not None and temperature is not None:
            ## InfluxDB logic
            point = Point(MQTT_PUBLISH_TOPIC).tag("id", sensor_id).field("temperature", temperature)
            write_api.write(bucket=BUCKET, record=point)
            print(f"Data written to InfluxDB - ID: {sensor_id}, Temperature: {temperature}")
        else:
            print("Invalid payload format. Missing 'id' or 'temperature'.")
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        
## MQTT logic - Register callbacks and start MQTT client
mqttc.on_connect = on_connect
mqttc.on_message = on_message
mqttc.loop_forever()