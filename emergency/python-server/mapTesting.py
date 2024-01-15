import numpy as np
from scipy.optimize import minimize
from geopy.distance import geodesic

def distance(point1, point2):
    """
    Calcule la distance géodésique entre deux points en utilisant geopy.
    """
    return geodesic(point1, point2).meters  # La distance en mètres

def objective_function(coords, known_points, distances):
    """
    Fonction objectif à minimiser lors de l'optimisation.
    """
    error = 0
    for i in range(len(known_points)):
        error += (distance(coords, known_points[i]) - distances[i]) ** 2
    return error

def trilaterate(known_points, distances):
    """
    Trilatération pour trouver les coordonnées du point inconnu.
    """
    initial_guess = np.mean(known_points, axis=0)  # Utilisation de la moyenne comme point de départ
    result = minimize(objective_function, initial_guess, args=(known_points, distances), method='L-BFGS-B')

    if result.success:
        return result.x
    else:
        raise Exception("La trilatération a échoué.")

# Exemple d'utilisation
known_points = [
    (45.732812, 4.85),
    (45.732812, 4.859999999999999),
    (45.724812, 4.85),
    (45.724812, 4.859999999999999)
]
distances = [0.8478932939166581, 0.6941171867907997, 0.5903494779296076, 0.3336977272080253]  # Distances par rapport au point inconnu
unknown_point = trilaterate(known_points, distances)
print("Coordonnées du point inconnu:", unknown_point)

# Fonction principale
def calculateFirePosition(coordinates_list, distances_list):

    #Convert distance from meters to kilometers
    distances_list = [distance/1000 for distance in distances_list]

    return trilaterate(coordinates_list, distances)