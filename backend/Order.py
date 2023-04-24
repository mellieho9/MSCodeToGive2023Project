import json
class Order:
    def __init__(self, partner, quantity):
        self.partner = partner
        self.quantity = quantity

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__)