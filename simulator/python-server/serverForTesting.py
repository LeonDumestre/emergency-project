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
        
class Captor:
    def __init__(self, id, values, latitude, longitude):
        self.id, self.values, self.latitude, self.longitude = id, values, latitude, longitude
    def __str__(self):
        return  "{}: {} - {}/{}".format(self.id, self.values, self.latitude, self.longitude)

# Calcule de ditance
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

# Generate the list with the 60 captors
nombre_capteurs = 60
captors = []
capteurs_ids = range(1, nombre_capteurs + 1)
for id in range(1, nombre_capteurs+1):
    values = []
    captors.append(Captor(id, values, 0, 0))

response = requests.get("http://localhost:3010/sensors")
data = response.json()

for sensor in data:
    captors[sensor.get("id")-1].latitude = sensor.get("latitude")
    captors[sensor.get("id")-1].longitude = sensor.get("longitude")
    
# Add coodinates to captors
#capteurs_latitudes = np.random.uniform(-90, 90, nombre_capteurs)  # Valeurs de latitude entre -90 et 90 degrés
#capteurs_longitudes = np.random.uniform(-180, 180, nombre_capteurs)  # Valeurs de longitude entre -180 et 180 degrés

testDistance = haversine_distance(captors[1].latitude, captors[1].longitude, captors[2].latitude, captors[2].longitude)
print(f"{testDistance:.5f}")
distanceBetweenCaptors = 2.16
layerDistance = 0.5
captorRange = 2.1500
testFire = Fire(1, 45.94363379999999, 4.8269455, 6)

for captor in captors:
    if haversine_distance(testFire.latitude, testFire.longitude, captor.latitude, captor.longitude) < captorRange:
        captor.values.append(FireByCaptor(testFire.intancity, haversine_distance(testFire.latitude, testFire.longitude, captor.latitude, captor.longitude)))


for capt in captors:
    print(capt)



# Test API

