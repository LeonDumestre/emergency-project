from collections import defaultdict
import math

class Circle:
    def __init__(self, center, radius):
        self.center = center
        self.radius = radius

def haversine_distance(coord1, coord2):
    # Convertir les coordonnées de degrés à radians
    lat1, lon1 = math.radians(coord1[0]), math.radians(coord1[1])
    lat2, lon2 = math.radians(coord2[0]), math.radians(coord2[1])

    # Calculer la différence entre les latitudes et longitudes
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    # Formule de la haversine
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    # Rayon de la Terre en mètres
    earth_radius = 6371000

    # Calculer la distance
    distance = earth_radius * c

    return distance

def find_all_circle_intersections(circles):
    intersections = []

    # Utiliser une approche heuristique pour trouver des points d'intersection potentiels
    for i in range(len(circles)):
        for j in range(i + 1, len(circles)):
            circle1 = circles[i]
            circle2 = circles[j]

            potential_intersections = find_potential_intersections(circle1, circle2)

            # Ajouter les points d'intersection à la liste
            intersections.extend(potential_intersections)

    return intersections

def find_potential_intersections(circle1, circle2):
    # Calculer la distance entre les centres des cercles
    distance = haversine_distance(circle1.center, circle2.center)

    # Vérifier s'ils se croisent
    if distance < circle1.radius + circle2.radius:
        # Calculer l'angle entre les deux centres
        theta = math.atan2(circle2.center[1] - circle1.center[1], circle2.center[0] - circle1.center[0])

        # Calculer les coordonnées des points d'intersection
        lat1, lon1 = circle1.center
        lat2, lon2 = circle2.center

        lat1 += circle1.radius / 6371000 * math.cos(theta)
        lon1 += circle1.radius / 6371000 * math.sin(theta)

        lat2 += circle2.radius / 6371000 * math.cos(theta + math.pi)
        lon2 += circle2.radius / 6371000 * math.sin(theta + math.pi)

        return [(lat1, lon1), (lat2, lon2)]

    return []



def find_repeated_intersections(intersections):
    intersection_counts = defaultdict(int)

    # Compter le nombre d'occurrences de chaque intersection
    for intersection in intersections:
        intersection_counts[intersection] += 1

    # Filtrer les intersections qui apparaissent trois fois ou plus
    repeated_intersections = [intersection for intersection, count in intersection_counts.items() if count >= 3]

    return repeated_intersections

if __name__ == "__main__":
    # Exemple avec cinq cercles, chaque cercle est représenté par un objet Circle
    circles = [
        Circle((45.788812, 4.8), 1000),  # San Francisco
        Circle((45.772812, 4.81), 1000),   # Los Angeles
        # Ajoutez d'autres cercles si nécessaire
    ]

    intersections = find_all_circle_intersections(circles)

    print("Points d'intersection :")
    for intersection in intersections:
        print(f"({intersection[0]}, {intersection[1]})")

    repeated_intersections = find_repeated_intersections(intersections)

    print("\nIntersections qui apparaissent trois fois ou plus :")
    for intersection in repeated_intersections:
        print(f"({intersection[0]}, {intersection[1]})")
