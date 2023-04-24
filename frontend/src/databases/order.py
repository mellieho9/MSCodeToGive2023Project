from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import sqlite3

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = '134737323'

# set up the orders database
def init_orders_db():
    conn = sqlite3.connect('orders.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS orders 
                (order_id INTEGER PRIMARY KEY,
                 order_date TEXT,
                 order_status TEXT,
                 item_quantity_dict TEXT,
                 partners TEXT)''')
    conn.commit()
    conn.close()

# function to calculate the quantity of an order
def calculate_order_quantity(item_quantity_dict):
    total_quantity = 0
    for item_id, quantity in item_quantity_dict.items():
        total_quantity += quantity
    return total_quantity

# function to check if the order is below 6000 pounds and find a suitable group to join
def check_order_below_6000_pounds(item_quantity_dict):
    order_quantity = calculate_order_quantity(item_quantity_dict)
    if order_quantity < 6000:
        conn = sqlite3.connect('orders.db')
        c = conn.cursor()
        c.execute("SELECT * FROM orders WHERE order_status='Open'")
        orders = c.fetchall()
        for order in orders:
            order_id = order[0]
            order_item_quantity_dict = eval(order[3])
            order_quantity = calculate_order_quantity(order_item_quantity_dict)
            if order_quantity + order_quantity < 6000:
                # join this order group
                order_item_quantity_dict.update(item_quantity_dict)
                c.execute("UPDATE orders SET item_quantity_dict=? WHERE order_id=?", (str(order_item_quantity_dict), order_id))
                conn.commit()
                conn.close()
                return order_id
        conn.close()
        return None
    else:
        return 'Add Order'


# This function handles a POST request to add a new order to the system.
# It expects a JSON payload containing the email of the partner placing the order
# and a dictionary of items and quantities.
# The function first checks if the partner exists in the partners database.
# If the order quantity is less than 6000 pounds, the function checks if there is an 
# existing order group that the order can be added to. If so, the order is added to that 
# group. If not, a new order group is created and the order is added to that group.
# If the order quantity is greater than or equal to 6000 pounds, a new order group 
# is created and the order is added to that group.
# If the partner does not exist in the partners database, a 404 error is returned.
# The function returns a JSON response indicating whether the order was successfully added 
# and the order group it was added to.
@app.route('/databases/add_order', methods=['POST'])
def add_order():
    data = request.json
    email = data['email']
    item_quantity_dict = data['item_quantity_dict']
    order_quantity = calculate_order_quantity(item_quantity_dict)
    conn = sqlite3.connect('partners.db')
    c = conn.cursor()
    c.execute("SELECT * FROM partners WHERE email=?", (email,))
    partner = c.fetchone()
    conn.close()
    if partner:
        if order_quantity < 6000:
            order_id = check_order_below_6000_pounds(item_quantity_dict)
            if order_id:
                return jsonify({'message': f'Order added to order group {order_id}.'}), 201
            else:
                conn = sqlite3.connect('orders.db')
                c = conn.cursor()
                order_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")
                order_status = 'Pending'
                c.execute("INSERT INTO orders (order_date, order_status, item_quantity_dict, partner_email) VALUES (?, ?, ?, ?)", (order_date, order_status, json.dumps(item_quantity_dict), email))
                order_id = c.lastrowid
                conn.commit()
                conn.close()
                return jsonify({'message': f'Order added to new order group {order_id}.'}), 201
        else:
            conn = sqlite3.connect('orders.db')
            c = conn.cursor()
            order_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")
            order_status = 'Pending'
            c.execute("INSERT INTO orders (order_date, order_status, item_quantity_dict, partner_email) VALUES (?, ?, ?, ?)", (order_date, order_status, json.dumps(item_quantity_dict), email))
            order_id = c.lastrowid
            conn.commit()
            conn.close()
            return jsonify({'message': f'Order added to new order group {order_id}.'}), 201
    else:
        return jsonify({'error': 'Partner not found.'}), 404

if __name__ == '__main__':
    app.run(port=3000, debug=True)