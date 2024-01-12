import threading
import matplotlib.pyplot as plt
import numpy as np
import requests
from collections import namedtuple
from math import radians, sin, cos, sqrt, atan2
import json

# ======================================================================================================================
# Variables
# ======================================================================================================================
tempFires = []  # Last fire list before update
tempCaptors = [] # Last captor list before update

# ======================================================================================================================
# Classes
# ======================================================================================================================
class Fire:
    def __init__(self, id, latitude, longitude, intensity):
        self.id, self.latitude, self.longitude, self.intensity = id, latitude, longitude, intensity
    def __str__(self):
        return "({}/{}/{}/{})".format(self.id, self.latitude, self.longitude, self.intensity)
        
class FireByCaptor:
    def __init__(self, id, intensity, distance):
        self.id, self.intensity, self.distance = id, intensity, distance
    def __str__(self):
        return "({}/{}/{})".format(self.id, self.intensity, self.distance)
        
class Captor:
    def __init__(self, id, values, latitude, longitude):
        self.id, self.values, self.latitude, self.longitude = id, values, latitude, longitude
    def __str__(self):
        values_str = "[" + ", ".join(str(fire) for fire in self.values) + "]"
        return "{}: {} - {}/{}".format(self.id, values_str, self.latitude, self.longitude)

# ======================================================================================================================
# Functions
# ======================================================================================================================

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
            captor.values.append(FireByCaptor(fire.id, fire.intensity, haversine_distance(fire.latitude, fire.longitude, captor.latitude, captor.longitude) * 1000))


# Get the list of fires
def getFireList(list):
    # API request
    response = requests.get("http://localhost:3110/fires")
    data = response.json()
    # Fire creation
    for fire in data:
        list.append(Fire(fire.get("id"), fire.get("latitude"), fire.get("longitude"), fire.get("intensity")))

# ======================================================================================================================
# Main
# ======================================================================================================================

def getSensorAndFireData():
    # Get sensors
    captors = []
    initCaptors(captors)

    # Get fires
    fires = []
    getFireList(fires)

    # Calculate impact
    for fire in fires:
        calculateFireImpact(captors, fire)
    
    # Remove empty captors
    returncaptors = []
    for captor in captors:
        if len(captor.values) > 0:
            returncaptors.append(captor)
    
    # Return captors with data
    return returncaptors

# Get sensors
captors = []
initCaptors(captors)

# Get fires
fires = []
getFireList(fires)

# Calculate impact
for fire in fires:
    calculateFireImpact(captors, fire)
    
# Remove empty captors
returncaptors = []
for captor in captors:
    if len(captor.values) > 0:
        returncaptors.append(captor)

def makeItJSON(captor):
    return json.dumps(captor, default=lambda o: o.__dict__, sort_keys=True, indent=4)

for sensor in returncaptors:
    print(makeItJSON(sensor))
