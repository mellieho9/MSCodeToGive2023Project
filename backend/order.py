import json
class Order:
    def __init__(self, partner, quantity, order_id=0):
        self.partner = partner
        self.quantity = quantity
        self.order_id = order_id

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__)