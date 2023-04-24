# Have to test this class
import os
import sqlite3

from dotenv import load_dotenv

from partner import Partner
import requests

from order import Order

# Load the API key from the .env file
load_dotenv()
API_KEY = os.getenv('API_KEY')
ACFB = Partner("ACFB", "3400 N Desert Dr, East Point, GA 30344")

# set up the routes database
def init_routes_db():
    conn = sqlite3.connect('routes.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS routes 		
                 (route_id INTEGER PRIMARY KEY AUTOINCREMENT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS orders
                (order_id INTEGER PRIMARY KEY,
                route_id INTEGER FOREIGN KEY REFERENCES routes(route_id))''')
    conn.commit()
    conn.close()


# Calculates distance between two partner locations
def calculate_distance(src_partner, dest_partner):
    # Make a request to the Google Maps api to get the travel time between the two locations
    url = 'https://routes.googleapis.com/directions/v2:computeRoutes'
    headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'routes.duration'
    }
    data = {
        "origin": {
            "location": {
                "latLng": {
                    "latitude": src_partner.latitude,
                    "longitude": src_partner.longitude
                }
            }
        },
        "destination": {
            "location": {
                "latLng": {
                    "latitude": dest_partner.latitude,
                    "longitude": dest_partner.longitude
                }
            }
        },
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE",
        "computeAlternativeRoutes": False,
        "routeModifiers": {
            "avoidTolls": False,
            "avoidHighways": False,
            "avoidFerries": True
        },
        "languageCode": "en-US",
        "units": "IMPERIAL"
    }

    response = requests.post(url, headers=headers, json=data)
    # Return the duration of the route
    # It comes back in seconds with an s at the end, so we remove the s and parse it to a float
    duration = float(response.json()['routes'][0]['duration'][:-1])
    return duration


# Gets the order from partner_orders that is closest to the current order
def nearest_unvisited(current_order: Order, partner_orders: list[Order]):
    minimum = float('inf')
    closest_order = None
    # Make a request to the Google Maps api to get the travel time between all locations
    url = 'https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix'
    headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'originIndex,destinationIndex,duration,distanceMeters'
    }
    data = {
        "origins": [
            {
                "waypoint": {
                    "location": {
                        "latLng": {
                            "latitude": current_order.partner.latitude,
                            "longitude": current_order.partner.longitude
                        }
                    }
                },
                "routeModifiers": {"avoid_ferries": True}
            }
        ],
        "destinations": [
        ],
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE"
    }

    for order in partner_orders:
        data['destinations'].append({
            "waypoint": {
                "location": {
                    "latLng": {
                        "latitude": order.partner.latitude,
                        "longitude": order.partner.longitude
                    }
                }
            }
        })
    response = requests.post(url, headers=headers, json=data)
    print(response.json())
    for destination in response.json():
        order = partner_orders[destination['destinationIndex']]
        # parse the float from the duration string, means eliminating last character and parsing
        duration = float(destination['duration'][:-1])
        if duration < minimum:
            distance_from_ACFB = calculate_distance(ACFB, order.partner)
            distance_to_next = calculate_distance(current_order.partner, order.partner)
            if distance_from_ACFB <= distance_to_next:
                minimum = duration
                closest_order = order
    return closest_order


def build_routes(partner_orders: list[Order]):
    routes = []
    # While there are still partner orders to visit
    while len(partner_orders) > 0:
        # make a new route
        route: list[Order] = []
        # start at ACFB
        recent_node = Order(ACFB, 0)
        # while there are still partner orders to visit that make sense, add them to the route
        while recent_node is not None and len(partner_orders) > 0:
            recent_node = nearest_unvisited(recent_node, partner_orders)
            if recent_node is not None:
                partner_orders.remove(recent_node)
                route.append(recent_node)
        # add the route to the list of routes
        routes.append(route)
    # add the route to the database
    for route in routes:
        conn = sqlite3.connect('routes.db')
        c = conn.cursor()
        c.execute('INSERT INTO routes DEFAULT VALUES')
        route_id = c.lastrowid
        for order in route:
            c.execute('INSERT INTO orders VALUES (?, ?)', (order.order_id, route_id))
        conn.commit()
        conn.close()
