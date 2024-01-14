import threading
import matplotlib.pyplot as plt
import numpy as np
import requests
from collections import namedtuple
from math import radians, sin, cos, sqrt, atan2
import json
import fireFinder as ff

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

def putFireList(fire):
    # API request
    response = requests.put("http://localhost:3010/fires", data = fire)
    return True


# Compare two captor to detect update
def compareCaptor(captor1, captor2):
    for fire1 in captor1.values:
        for fire2 in captor2.values:
            if fire1.intensity == fire2.intensity and fire1.distance == fire2.distance:
                return True
    return False

# ======================================================================================================================
# Fires functions
# ======================================================================================================================

def receivedFire(fire):
    if doesFireAlreadyExist(fire):
        if hasFirePosition(fire) != True:
            findFire(fire).intensity = fire.intensity
        else :
            findFire(fire).intensity = fire.intensity
            firePos = tryFindFire(tempFires)
            if firePos != None:
                fireToUpdate = findFire(fire)
                fireToUpdate.latitude = firePos[0]
                fireToUpdate.longitude = firePos[1]
                putFireList(firePos)
            return False
    else:
        tempFires.append(Fire(fire.id, 0, 0, fire.intensity))
        return True
    
def hasFirePosition(fire):
    if fire.latitude != 0 and fire.longitude != 0:
        return True
    return False

def findFire(fire):
    for fireInTemp in tempFires:
        if fireInTemp.id == fire.id:
            return fireInTemp
    return None

def doesFireAlreadyExist(fire):
    for fireInTemp in tempFires:
        if fireInTemp.id == fire.id:
            return True
    return False

def tryFindFire(fires):
    for fire in fires:
        associatedCaptors = findAssociatedCaptors(fire)
        if len(associatedCaptors) > 4:
            points_gps = [] 
            distances = []
            for captor in associatedCaptors:
                # Captor list
                points_gps.append((captor.latitude, captor.longitude))
                # Distance from captor list
                distances.append(findDistanceInCaptorForFire(captor, fire))
            # Find Fire
            #TODO: Remake the function to find the fire with the actual data
            firePos = ff.calculateFirePosition(points_gps[:4], distances[:4])
            return firePos
    return None
        
# ======================================================================================================================
# Captors functions
# ======================================================================================================================

def receivedSensor(sensor):
    if doesCaptorAlreadyExist(sensor):
        # Create the captor
        tempCaptors.append(sensor)
    else:
        # Update the captor
        for captor in tempCaptors:
            if captor.id == sensor.id:
                captor.values = sensor.values
                captor.latitude = sensor.latitude
                captor.longitude = sensor.longitude
                break
    
    for fire in sensor.values:
        receivedFire(fire)

def doesCaptorAlreadyExist(captor):
    for captorInTemp in tempCaptors:
        if captorInTemp.id == captor.id:
            return True
    return False

def findAssociatedCaptors(fire):
    associatedCaptors = []
    for captor in tempCaptors:
        for fireByCaptor in captor.values:
            if fireByCaptor.id == fire.id:
                associatedCaptors.append(captor)
    return associatedCaptors

def findDistanceInCaptorForFire(captor, fire):
    for fireByCaptor in captor.values:
        if fireByCaptor.id == fire.id:
            return fireByCaptor.distance
    return -1

# ======================================================================================================================
# Main
# ======================================================================================================================

def receivedData(data_str):
    # parse the data
    data = json.loads(data_str.decode("utf-8"))

    firesInData = []
    for fire in data.get("values"):
        element = FireByCaptor(fire.get("id"), fire.get("intensity"), fire.get("distance"))
        firesInData.append(element)

    sensor = Captor(data.get("id"), firesInData, data.get("latitude"), data.get("longitude"))

    receivedSensor(sensor)

# test data
data_str = b'{"id": 121, "latitude": 45.716812, "longitude": 4.83, "values": [{"distance": 781.5258540578316, "id": 36, "intensity": 1}]}'

# parse the data
data = json.loads(data_str.decode("utf-8"))

firesInData = []
for fire in data.get("values"):
    element = FireByCaptor(fire.get("id"), fire.get("intensity"), fire.get("distance"))
    firesInData.append(element)

sensor = Captor(data.get("id"), firesInData, data.get("latitude"), data.get("longitude"))
print (sensor.values[0].id)