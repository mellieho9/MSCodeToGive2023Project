from Order import Order
from Partner import PartnerOrder

#This method is used to generate data
def createPartnerOrder(zipCode, name, quantity):
    partner = PartnerOrder(name, zipCode)
    order = Order(partner, quantity)
    return order

#This method is used to generate data
def createClusters(clusterList, clusterName, partnerOrders):
    i=0
    for code in clusterList:
        #Giving quantity as 2000 for all orders temporarily. Will have to change 
        partnerOrders.append(createPartnerOrder(code, clusterName+str(i), 2000))
        i=i+1

# Generate dummy partner and order data from zipcodes of the ACFB partners
def generateData():
    partnerOrders = []
    randomSouth = [30650, 30233, 30224, 30263]
    CantonHighway = [30114, 30107, 30177]
    Gainesville = [30542, 30507, 30040]
    allCodes = [randomSouth, CantonHighway, Gainesville]
    createClusters(randomSouth, "randomSouth", partnerOrders)
    createClusters(CantonHighway, "CantonHighway", partnerOrders)
    createClusters(Gainesville, "Gainesville", partnerOrders)
    print(len(partnerOrders))
    return partnerOrders