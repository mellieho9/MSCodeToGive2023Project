from flask import Flask
from route import build_routes
from dummy_data import generate_data
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)


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
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5001'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


