from scipy.optimize import minimize
from geopy.distance import geodesic
from pyproj import Proj, Transformer
import numpy as np

# Coordonnées GPS des quatre points connus
points_gps = {
    'A': (45.748812,4.84),
    'B': (45.748812,4.85),
    'C': (45.740812,4.84),
    'D': (45.740812,4.85),
}

# Distances par rapport aux quatre points
distances = {
    'AB': 0.4616258449977258,
    'AC': 0.5170748761910181,
    'AD': 0.6893471472452194,
    'BC': 0.7276505161804316,
}

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

# Fonction d'erreur à minimiser
def error_function(coordinates):
    x, y = coordinates
    errors = []
    for pair in distances.keys():
        errors.append(np.abs(np.linalg.norm(gps_to_cartesian(points_gps[pair[0]]) - np.array([x, y])) - distances[pair] * 1000))
    return sum(errors)


print(points_gps)
# Initialisation des coordonnées du cinquième point (peut être ajusté selon votre connaissance initiale)
initial_guess = np.array([0.0, 0.0])

# Minimisation de la fonction d'erreur
result = minimize(error_function, initial_guess, method='L-BFGS-B')

# Coordonnées du cinquième point en coordonnées GPS
coordinates_fifth_point_cartesian = result.x
coordinates_fifth_point_gps = cartesian_to_gps(coordinates_fifth_point_cartesian)

print("Coordonnées du cinquième point en coordonnées GPS:", coordinates_fifth_point_gps)