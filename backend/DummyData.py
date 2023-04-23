from Order import Order
from Partner import Partner

#This method is used to generate data
def createPartnerOrder(zipCode, name, quantity):
    partner = Partner(name, zipCode)
    order = Order(partner, quantity)
    return order

#This method is used to generate data
def createClusters(clusterList, clusterName, partnerOrders):
    i=0
    for code in clusterList:
        #Giving quantity as 2000 for all orders temporarily. Will have to change 
        partnerOrders.append(createPartnerOrder(code, clusterName+str(i), 2000))
        i = i+1

# Generate dummy partner and order data from zipcodes of the ACFB partners
def generateData():
    partnerOrders = []
    partnerLocs = ["323 Inman St, Ringgold, Georgia, 30736",
                   "401 Peters St, Calhoun, Georgia, 30701",
                   "1411 Rome Rd SW, Calhoun, Georgia, 30701"]
    createClusters(partnerLocs, "partnerLocs", partnerOrders)
    print(len(partnerOrders))
    return partnerOrders