from Order import Order
from Partner import Partner


# This method is used to generate data
def create_partner_order(zipCode, name, quantity):
    partner = Partner(name, zipCode)
    order = Order(partner, quantity)
    return order


# This method is used to generate data
def create_clusters(cluster_list, cluster_name, partner_orders):
    i = 0
    for code in cluster_list:
        # Giving quantity as 2000 for all orders temporarily. Will have to change
        partner_orders.append(create_partner_order(code, cluster_name + str(i), 2000))
        i = i + 1


# Generate dummy partner and order data from zipcodes of the ACFB partners
def generate_data():
    partner_orders = []
    partner_locs = ["323 Inman St, Ringgold, Georgia, 30736",
                    "401 Peters St, Calhoun, Georgia, 30701",
                    "1411 Rome Rd SW, Calhoun, Georgia, 30701"]
    create_clusters(partner_locs, "partnerLocs", partner_orders)
    print(len(partner_orders))
    return partner_orders
