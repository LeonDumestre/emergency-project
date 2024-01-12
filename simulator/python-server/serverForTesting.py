import threading
import matplotlib.pyplot as plt
import numpy as np
import requests
import json
from collections import namedtuple
from math import radians, sin, cos, sqrt, atan2

# Variables
semaphore = threading.Semaphore(1)
sendingQueue = []

# Class and decoder to get fire from simulator
class Fire:
    def __init__(self, id, latitude, longitude, intensity):
        self.id, self.latitude, self.longitude, self.intensity = id, latitude, longitude, intensity
        
class FireByCaptor:
    def __init__(self, intensity, distance):
        self.intensity, self.distance = intensity, distance
    def __str__(self):
        return "{} -> {}".format(self.intensity, self.distance)
        
class Captor:
    def __init__(self, id, values, latitude, longitude):
        self.id, self.values, self.latitude, self.longitude = id, values, latitude, longitude
    def __str__(self):
        values_str = "[" + ", ".join(str(fire) for fire in self.values) + "]"
        return "{}: {} - {}/{}".format(self.id, values_str, self.latitude, self.longitude)

# Calculate distance
def haversine_distance(lat1, lon1, lat2, lon2):
    # Convertir les coordonnées de degrés à radians
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    # Différences de coordonnées
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    # Formule de la distance haversine
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    # Rayon de la Terre en kilomètres (approximatif)
    radius_of_earth = 6371.0

    # Calcul de la distance
    distance = radius_of_earth * c

    return distance

# Init the list of sensors
def initCaptors(captors):    
    # Generate sensors
    # API request
    response = requests.get("http://localhost:3110/sensors")
    data = response.json()
    # Sensor creation
    for sensor in data:
        values = []
        captors.append(Captor(sensor.get("id"), values, sensor.get("latitude"), sensor.get("longitude")))

# Calculate the impact of a fire on the sensors
def calculateFireImpact(captors, fire):
    captorRange = 0.9
    for captor in captors:
        if haversine_distance(fire.latitude, fire.longitude, captor.latitude, captor.longitude) < captorRange:
            captor.values.append(FireByCaptor(testFire.intensity, haversine_distance(fire.latitude, fire.longitude, captor.latitude, captor.longitude)))

# Get the list of fires
def getFireList(list):
    # API request
    response = requests.get("http://localhost:3110/fires")
    data = response.json()
    # Fire creation
    for fire in data:
        list.append(Fire(fire.get("id"), fire.get("latitude"), fire.get("longitude"), fire.get("intensity")))

# Compare two captor to detect update
def compareCaptor(captor1, captor2):
    for fire1 in captor1.values:
        for fire2 in captor2.values:
            if fire1.intensity == fire2.intensity and fire1.distance == fire2.distance:
                return True
    return False

# Thread reading the sendingQueue and sending data to the server 
#TODO: Change destination as UART
#TODO: Add JSON creation algo when multiple items in sendingQueue
def sendThread():
    while True:
        semaphore.acquire()
        if len(sendingQueue) > 0:
            captor = sendingQueue.pop(0)
            semaphore.release()
            # API request
            response = requests.put("http://localhost:3110/sensors/" + str(captor.id), json.dumps(captor.values))
            print(response)
        else:
            semaphore.release()


# Init
captors = []
initCaptors(captors)

# Start the thread
#thread = threading.Thread(target=sendThread)
#thread.start()

testFire = Fire(1, 45.724328666666665, 4.810751, 6)
calculateFireImpact(captors, testFire)

for capt in captors:
    print(capt)