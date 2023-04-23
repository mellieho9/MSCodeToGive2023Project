from flask import Flask
from Route import getRoutes
from DummyData import generateData
import json

from backend.Order import Order

app = Flask(__name__)


@app.route("/summary")
def hello_world():
    partnerOrders: list[Order] = generateData()
    print(len(partnerOrders))
    routes = getRoutes(partnerOrders)
    print(routes[0])
    print(routes)
    response = app.response_class(
        response=json.dumps(routes[1:]),
        status=200,
        mimetype='application/json'
    )
    return response
