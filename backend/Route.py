# Have to test this class
import os

from dotenv import load_dotenv

from Partner import Partner
import requests

# Load the API key from the .env file
load_dotenv()
API_KEY = os.getenv('API_KEY')

# Calculates distance between two partner locations
def calculateDistance(srcPartner, destPartner):
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

# Calculates the distance from currPartner to the nextNearestPartner
def nearestUnvisited(currNode, partnerOrders, routed):
    min = 10000000
    minIdx = -1
    ACFB = Partner("ACFB", 30344)
    # Make a request to the Google Maps api to get the travel time between the two locations
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
                            "latitude": currNode.latitude,
                            "longitude": currNode.longitude
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

    for index in range(len(routed)):
        if not routed[index]:
            data['destinations'].append({
                "waypoint": {
                    "location": {
                        "latLng": {
                            "latitude": partnerOrders[index].partner.latitude,
                            "longitude": partnerOrders[index].partner.longitude
                        }
                    }
                }
            })
    response = requests.post(url, headers=headers, json=data)
    for destination in response.json():
        # parse the float from the duration string, means eliminating last character and parsing
        duration = float(destination['duration'][:-1])
        if duration < min:
            min = duration
            minIdx = destination['destinationIndex']
    distanceFromACFB = calculateDistance(ACFB, partnerOrders[minIdx].partner)
    distanceToNext = calculateDistance(currNode, partnerOrders[minIdx].partner)
    if distanceToNext < distanceFromACFB:
        return minIdx
    else:
        return -1


# Returns all the routes for the partnerOrders that are in pending state
def getRoutes(partnerOrders):
    n = len(partnerOrders)
    routed = [False for i in range(n)]
    i = 0
    routes = []
    ACFB = Partner("ACFB", "3400 N Desert Dr, East Point, GA 30344")
    currTruckCapacity = 0
    MAX_TRUCK_CAPACITY = 14000
    while (i < n):
        if routed[i]:
            continue
        route = []
        currNode = ACFB
        print(currNode.printPartner())
        while currTruckCapacity < MAX_TRUCK_CAPACITY:
            nearestUnvisitedIdx = nearestUnvisited(currNode, partnerOrders, routed)
            if nearestUnvisitedIdx == -1:
                break
            nextNode = partnerOrders[nearestUnvisitedIdx]
            route.append(nextNode)
            routed[nearestUnvisitedIdx] = True
            currTruckCapacity += nextNode.quantity
            currNode = nextNode.partner
            print(currNode.printPartner())
        routes.append(route)
        i = i + 1
        
    if currTruckCapacity >= 6000 and currTruckCapacity <= MAX_TRUCK_CAPACITY:
        routes.insert(0,0)
        return routes
    elif currTruckCapacity < 6000:
        routes.insert(0,-1)
        return routes
    else:
        routes.insert(0,1)
        return routes
