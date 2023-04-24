from flask import Flask
from Route import getRoutes
from DummyData import generateData
import json 

app = Flask(__name__)

@app.route("/summary")
def hello_world():
    partnerOrders = generateData()
    print(len(partnerOrders))
    routes = getRoutes(partnerOrders)
    print(routes[0])
    response = app.response_class(
        response=json.dumps([p.toJson() for p in partnerOrders]),
        status=200,
        mimetype='application/json'
    )
    return response
