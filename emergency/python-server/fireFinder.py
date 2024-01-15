from scipy.optimize import minimize
from pyproj import Proj, Transformer
import numpy as np

points_gps = {}
distances = {}

# Fonction de conversion de coordonnées GPS en coordonnées cartésiennes
def gps_to_cartesian(coord):
    TRAN_4326_TO_3857 = Transformer.from_crs("EPSG:4326", "EPSG:3857")
    lat, lon = coord
    return TRAN_4326_TO_3857.transform(lon, lat)

# Fonction de conversion de coordonnées cartésiennes en coordonnées GPS
def cartesian_to_gps(coord):
    TRAN_3857_TO_4326 = Transformer.from_crs("EPSG:3857", "EPSG:4326")
    lon, lat = TRAN_3857_TO_4326.transform(coord[0], coord[1])
    return lat, lon

def generate_distance_dict(distances_list, coordinates_list):
    index = 0
    num_coordinates = len(coordinates_list)
    
    for i in range(num_coordinates - 1):
        for j in range(i + 1, num_coordinates):
            point_name_i = chr(ord('A') + i)
            point_name_j = chr(ord('A') + j)
            
            if index < len(distances_list):
                distance_key = f'{point_name_i}{point_name_j}'
                distances[distance_key] = distances_list[index]
                index += 1
            else:
                break

    return distances


def liste_coords_to_dictionnaire(liste_coords):
    lettre = ord('A')  # initialise la lettre à 'A'

    for coords in liste_coords:
        nom_point = chr(lettre)
        points_gps[nom_point] = tuple(coords)
        lettre += 1

    return points_gps

# Fonction d'erreur à minimiser
def error_function(coordinates):
    x, y = coordinates
    errors = []
    for pair in distances.keys():
        errors.append(np.abs(np.linalg.norm(gps_to_cartesian(points_gps[pair[0]]) - np.array([x, y])) - distances[pair] * 1000))
    return sum(errors)


# Fonction principale
def calculateFirePosition(coordinates_list, distances_list):

    #Convert distance from meters to kilometers
    distances_list = [distance/1000 for distance in distances_list]

    generate_distance_dict(distances_list, coordinates_list)
    liste_coords_to_dictionnaire(coordinates_list)

    # Initialisation des coordonnées du cinquième point (peut être ajusté selon votre connaissance initiale)
    initial_guess = np.array([0.0, 0.0])

    # Minimisation de la fonction d'erreur
    result = minimize(error_function, initial_guess, method='L-BFGS-B')

    # Coordonnées du cinquième point en coordonnées GPS
    coordinates_fifth_point_cartesian = result.x
    coordinates_fifth_point_gps = cartesian_to_gps(coordinates_fifth_point_cartesian)

    return coordinates_fifth_point_gps