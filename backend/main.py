from flask import Flask
from Route import build_routes
from DummyData import generate_data
import json

app = Flask(__name__)


@app.route("/summary")
def hello_world():
    partnerOrders = generate_data()
    print(len(partnerOrders))
    routes = build_routes(partnerOrders)
    print(routes[0])
    response = app.response_class(
        response=json.dumps([[p.to_json() for p in r] for r in routes]),
        status=200,
        mimetype='application/json'
    )
    return response
