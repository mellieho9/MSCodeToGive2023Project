# Have to test this class
import os

from dotenv import load_dotenv

from Partner import PartnerOrder
from geopy.distance import geodesic
import requests

# Load the API key from the .env file
load_dotenv()
API_KEY = os.getenv('GOOGLE_MAPS_API_KEY')


# Calculates distance between two partner locations
def calculateDistance(srcPartner, destPartner):
    # Make a request to the Google Maps api to get the travel time between the two locations
    url = 'https://routes.googleapis.com/directions/v2:computeRoutes'
    headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
    }
    data = {
        "origin": {
            "location": {
                "latLng": {
                    "latitude": srcPartner.latitude,
                    "longitude": srcPartner.longitude
                }
            }
        },
        "destination": {
            "location": {
                "latLng": {
                    "latitude": destPartner.latitude,
                    "longitude": destPartner.longitude
                }
            }
        },
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE",
        "computeAlternativeRoutes": False,
        "routeModifiers": {
            "avoidTolls": False,
            "avoidHighways": False,
            "avoidFerries": False
        },
        "languageCode": "en-US",
        "units": "IMPERIAL"
    }

    response = requests.post(url, headers=headers, json=data)
    # Return the duration of the route
    # It comes back in seconds with an s at the end, so we remove the s and parse it to a float
    duration = float(response.json()['routes'][0]['duration'].replace('s', ''))
    route_distance = response.json()['routes'][0]['distanceMeters']
    polyline = response.json()['routes'][0]['polyline']['encodedPolyline']
    return duration, route_distance, polyline


# Calculates the distance from currPartner to the nextNearestPartner
def nearestUnvisited(currNode, partnerOrders, routed):
    min = 10000000
    minIdx = -1
    for index in range(routed):
        if not routed[index]:
            d = calculateDistance(currNode.partner, currNode.partner,
                                  partnerOrders[index].partner)
            if d < min:
                min = d
                minIdx = index
    return minIdx


# Returns all the routes for the partnerOrders that are in pending state
def getRoutes(partnerOrders):
    n = len(partnerOrders)
    routed = [False for i in range(n)]
    i = 0
    routes = []
    ACFB = PartnerOrder("ACFB", 30344)
    MAX_TRUCK_CAPACITY = 14000
    while (i < n):
        if routed:
            continue
        route = []
        currNode = ACFB
        route.append(currNode)
        currTruckCapacity = 0
        while currTruckCapacity < MAX_TRUCK_CAPACITY:
            nearestUnvisitedIdx = nearestUnvisited(currNode, partnerOrders, routed)
            if nearestUnvisitedIdx == -1:
                break
            nextNode = partnerOrders[nearestUnvisitedIdx]
            route.append(nextNode)
            routed[nearestUnvisitedIdx] = True
            currTruckCapacity = currTruckCapacity + nextNode.quantity
        i = i + 1
    return routes
