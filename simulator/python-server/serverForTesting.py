import matplotlib.pyplot as plt
import numpy as np
import requests
import json
from collections import namedtuple
from math import radians, sin, cos, sqrt, atan2

# Class and decoder to get fire from simulator
class Fire:
    def __init__(self, id, latitude, longitude, intancity):
        self.id, self.latitude, self.longitude, self.intancity = id, latitude, longitude, intancity
        
class FireByCaptor:
    def __init__(self, intancity, distance):
        self.intancity, self.distance = intancity, distance
    def __str__(self):
        return "{} -> {}".format(self.intancity, self.distance)
        
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

# Init the list of captors
def initCaptors(captors):    
    # Generate captors
    # API request
    response = requests.get("http://localhost:3110/sensors")
    data = response.json()
    # Sensor creation
    for sensor in data:
        values = []
        captors.append(Captor(sensor.get("id"), values, sensor.get("latitude"), sensor.get("longitude")))

# Calculate the impact of a fire on the captors
def calculateFireImpact(captors, fire):
    captorRange = 0.9
    for captor in captors:
        if haversine_distance(fire.latitude, fire.longitude, captor.latitude, captor.longitude) < captorRange:
            captor.values.append(FireByCaptor(testFire.intancity, haversine_distance(fire.latitude, fire.longitude, captor.latitude, captor.longitude)))


captors = []
initCaptors(captors)
testFire = Fire(1, 45.724328666666665, 4.810751, 6)
calculateFireImpact(captors, testFire)

for capt in captors:
    print(capt)