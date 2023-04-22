from flask import Flask
from Route import getRoutes
from DummyData import generateData

app = Flask(__name__)

@app.route("/")
def hello_world():
    partnerOrders = generateData()
    print(len(partnerOrders))
    #routes = getRoutes(partnerOrders)
    #print(routes[0])
    return "Welcome to Code To Give Team Route!"