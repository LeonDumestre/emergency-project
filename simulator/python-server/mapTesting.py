import folium
from shapely.geometry import Point
from shapely.ops import unary_union
from geopy.distance import geodesic
from math import radians, sin, cos, sqrt, atan2, degrees

# Liste de coordonnées GPS (latitude, longitude)
coordonnees = [(45.748812, 4.840000072457361),
(45.748812, 4.84999991883929),
(45.74881192754264, 4.84),
(45.74081210820078, 4.84),
(45.74881195473625, 4.840000056579693),
(45.740812071348245, 4.8499999108146925),
(45.74881194929931, 4.849999936624133),
(45.740812067592486, 4.840000084490612),
(45.748811918839294, 4.85),
(45.74081211421292, 4.85),
(45.740812, 4.840000108200776),
(45.740812, 4.84999988578708)]  # Exemple, remplacez par vos coordonnées

coordonnees_liste2 = [(45.788812, 4.8),
(45.788812, 4.81),
(45.788812, 4.819999999999999),
(45.788812, 4.83),
(45.788812, 4.84),
(45.788812, 4.85),
(45.788812, 4.859999999999999),
(45.788812, 4.87),
(45.788812, 4.88),
(45.788812, 4.89),
(45.788812, 4.8999999999999995),
(45.788812, 4.91),
(45.788812, 4.92),
(45.780812, 4.8),
(45.780812, 4.81),
(45.780812, 4.819999999999999),
(45.780812, 4.83),
(45.780812, 4.84),
(45.780812, 4.85),
(45.780812, 4.859999999999999),
(45.780812, 4.87),
(45.780812, 4.88),
(45.780812, 4.89),
(45.780812, 4.8999999999999995),
(45.780812, 4.91),
(45.780812, 4.92),
(45.772812, 4.8),
(45.772812, 4.81),
(45.772812, 4.819999999999999),
(45.772812, 4.83),
(45.772812, 4.84),
(45.772812, 4.85),
(45.772812, 4.859999999999999),
(45.772812, 4.87),
(45.772812, 4.88),
(45.772812, 4.89),
(45.772812, 4.8999999999999995),
(45.772812, 4.91),
(45.772812, 4.92),
(45.764812, 4.8),
(45.764812, 4.81),
(45.764812, 4.819999999999999),
(45.764812, 4.83),
(45.764812, 4.84),
(45.764812, 4.85),
(45.764812, 4.859999999999999),
(45.764812, 4.87),
(45.764812, 4.88),
(45.764812, 4.89),
(45.764812, 4.8999999999999995),
(45.764812, 4.91),
(45.764812, 4.92),
(45.756812, 4.8),
(45.756812, 4.81),
(45.756812, 4.819999999999999),
(45.756812, 4.83),
(45.756812, 4.84),
(45.756812, 4.85),
(45.756812, 4.859999999999999),
(45.756812, 4.87),
(45.756812, 4.88),
(45.756812, 4.89),
(45.756812, 4.8999999999999995),
(45.756812, 4.91),
(45.756812, 4.92),
(45.748812, 4.8),
(45.748812, 4.81),
(45.748812, 4.819999999999999),
(45.748812, 4.83),
(45.748812, 4.84),
(45.748812, 4.85),
(45.748812, 4.859999999999999),
(45.748812, 4.87),
(45.748812, 4.88),
(45.748812, 4.89),
(45.748812, 4.8999999999999995),
(45.748812, 4.91),
(45.748812, 4.92),
(45.740812, 4.8),
(45.740812, 4.81),
(45.740812, 4.819999999999999),
(45.740812, 4.83),
(45.740812, 4.84),
(45.740812, 4.85),
(45.740812, 4.859999999999999),
(45.740812, 4.87),
(45.740812, 4.88),
(45.740812, 4.89),
(45.740812, 4.8999999999999995),
(45.740812, 4.91),
(45.740812, 4.92),
(45.732812, 4.8),
(45.732812, 4.81),
(45.732812, 4.819999999999999),
(45.732812, 4.83),
(45.732812, 4.84),
(45.732812, 4.85),
(45.732812, 4.859999999999999),
(45.732812, 4.87),
(45.732812, 4.88),
(45.732812, 4.89),
(45.732812, 4.8999999999999995),
(45.732812, 4.91),
(45.732812, 4.92),
(45.724812, 4.8),
(45.724812, 4.81),
(45.724812, 4.819999999999999),
(45.724812, 4.83),
(45.724812, 4.84),
(45.724812, 4.85),
(45.724812, 4.859999999999999),
(45.724812, 4.87),
(45.724812, 4.88),
(45.724812, 4.89),
(45.724812, 4.8999999999999995),
(45.724812, 4.91),
(45.724812, 4.92),
(45.716812, 4.8),
(45.716812, 4.81),
(45.716812, 4.819999999999999),
(45.716812, 4.83),
(45.716812, 4.84),
(45.716812, 4.85),
(45.716812, 4.859999999999999),
(45.716812, 4.87),
(45.716812, 4.88),
(45.716812, 4.89),
(45.716812, 4.8999999999999995),
(45.716812, 4.91),
(45.716812, 4.92)]

list_cicrle = [(45.748812,4.84, 461.6258449977258),
(45.748812,4.85, 517.0748761910181),
(45.740812,4.84, 689.3471472452194),
(45.740812,4.85, 727.6505161804316)]

# Créer une carte centrée sur la première coordonnée
carte = folium.Map(location=coordonnees[0], zoom_start=10)

# Ajouter des marqueurs pour chaque coordonnée
#for coordonnee in coordonnees:
#    folium.Marker(location=coordonnee).add_to(carte)

# Ajouter des marqueurs pour la deuxième liste de coordonnées
#for coordonnee in coordonnees_liste2:
#    folium.Marker(location=coordonnee, popup='Marqueur Liste 2', icon=folium.Icon(color='red')).add_to(carte)

for coordonnee in list_cicrle:
    folium.Circle(location=(coordonnee[0], coordonnee[1]), radius=coordonnee[2], color='green', fill=True, fill_color='green', fill_opacity=0.2).add_to(carte) 
#folium.Marker(location=(45.74613679680273, 4.844549334228688), icon=folium.Icon(color='green')).add_to(carte)
# Convertir les cercles en objets Shapely
class CircleData:
    def __init__(self, center, radius):
        self.center = center
        self.radius = radius

circles = [CircleData((coordonnee[0], coordonnee[1]), coordonnee[2]) for coordonnee in list_cicrle]
print(circles)
# Calculer l'union des cercles
intersection_points = []

def haversine_distance(coord1, coord2):
    # Convertir les coordonnées de degrés à radians
    lat1, lon1 = radians(coord1[0]), radians(coord1[1])
    lat2, lon2 = radians(coord2[0]), radians(coord2[1])

    # Calculer la différence entre les latitudes et longitudes
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    # Formule de la haversine
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    # Rayon de la Terre en mètres (approximatif)
    radius_of_earth = 6371000.0

    # Calculer la distance
    distance = radius_of_earth * c

    return distance

def gps_to_cartesian(latitude, longitude):
    # Rayon moyen de la Terre en mètres
    radius_of_earth = 6371000.0

    lat_rad = radians(latitude)
    lon_rad = radians(longitude)

    x = radius_of_earth * cos(lat_rad) * cos(lon_rad)
    y = radius_of_earth * cos(lat_rad) * sin(lon_rad)
    z = radius_of_earth * sin(lat_rad)

    return x, y, z

def find_circle_intersection(circle1, circle2):
    # Convertir les coordonnées GPS en coordonnées cartésiennes
    x1, y1, z1 = gps_to_cartesian(*circle1.center)
    r1 = circle1.radius
    x2, y2, z2 = gps_to_cartesian(*circle2.center)
    r2 = circle2.radius

    # Calculer la distance entre les centres des cercles
    d = sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2)

    # Vérifier s'ils se croisent
    if d < r1 + r2:
        # Calculer les coordonnées des points d'intersection en coordonnées cartésiennes
        a = (r1 ** 2 - r2 ** 2 + d ** 2) / (2 * d)
        x_inter = x1 + a * (x2 - x1) / d
        y_inter = y1 + a * (y2 - y1) / d
        z_inter = z1 + a * (z2 - z1) / d

        # Convertir les coordonnées cartésiennes en coordonnées GPS
        lat_inter, lon_inter = degrees(atan2(z_inter, sqrt(x_inter ** 2 + y_inter ** 2))), degrees(atan2(y_inter, x_inter))

        return lat_inter, lon_inter

    return None



def calculate_all_circle_intersections(circles):
    intersections = []

    for i in range(len(circles)):
        for j in range(i + 1, len(circles)):
            circle1 = circles[i]
            circle2 = circles[j]

            # Calculer les intersections entre les deux cercles
            circle_intersection  = find_circle_intersection(circle1, circle2)

            # Ajouter l'intersection à la liste globale
            if circle_intersection:
                intersections.append(circle_intersection)

    return intersections

intersection_point = calculate_all_circle_intersections(circles)

for coordonnee in circles:
    folium.Circle(location=(coordonnee.center), radius=coordonnee.radius, color='red', fill=True, fill_color='green', fill_opacity=0.2).add_to(carte)

for intersection in intersection_point:
    folium.Marker(location=intersection, icon=folium.Icon(color='purple')).add_to(carte)
# Sauvegarder la carte au format HTML
carte.save('carte_points.html')
