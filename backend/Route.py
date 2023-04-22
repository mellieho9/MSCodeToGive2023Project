# Have to test this class
from Partner import PartnerOrder
from geopy.distance import geodesic

#Calculates distance between two partner locations
def calculateDistance(srcPartner, destPartner):
    src = (srcPartner.latitude, srcPartner.longitude)
    dest = (destPartner.latitude, destPartner.longitude)
    return geodesic(src, dest).miles

#Calculates the distance from currPartner to the nextNearestPartner
def nearestUnvisited(currNode, partnerOrders, routed):
    min = 10000000
    minIdx = -1
    for index in range(routed):
        if not routed[index]:
            d=calculateDistance(currNode.partner, currNode.partner, 
                              partnerOrders[index].partner)
            if d<min:
                min = d
                minIdx = index
    return  minIdx

#Returns all the routes for the partnerOrders that are in pending state
def getRoutes(partnerOrders):
    n = len(partnerOrders)
    routed = [False for i in range(n)]
    i=0
    routes=[]
    ACFB = PartnerOrder("ACFB", 30344)
    MAX_TRUCK_CAPACITY = 14000
    while(i<n):
        if routed:
            continue
        route = []
        currNode = ACFB
        route.append(currNode)
        currTruckCapacity=0
        while currTruckCapacity<MAX_TRUCK_CAPACITY:
            nearestUnvisitedIdx = nearestUnvisited(currNode, partnerOrders, routed)
            if nearestUnvisitedIdx==-1:
                break
            nextNode = partnerOrders[nearestUnvisitedIdx]
            route.append(nextNode)
            routed[nearestUnvisitedIdx] = True
            currTruckCapacity=currTruckCapacity+nextNode.quantity
        i=i+1
    return routes

