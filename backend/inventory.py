from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
import sqlite3
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app, origins=['http://localhost:5001'])

app.config['SECRET_KEY'] = '134737323'

# set up the inventory database
def init_inventory_db():
    conn = sqlite3.connect('inventory.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS inventory 
                (item_id INTEGER PRIMARY KEY,
                 item_name TEXT,
                 available_amount INTEGER,
                 expiry_date TEXT)''')
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (1, 'Apples', 500, '2023-05-01 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (2, 'Oranges', 800, '2023-05-15 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (3, 'Bananas', 600, '2023-06-01 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (4, 'Strawberries', 400, '2023-05-07 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (5, 'Blueberries', 300, '2023-05-08 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (6, 'Raspberries', 700, '2023-05-10 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (7, 'Mangoes', 900, '2023-05-18 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (8, 'Pineapples', 400, '2023-05-23 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (9, 'Watermelons', 1000, '2023-06-05 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (10, 'Grapes', 600, '2023-06-08 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (11, 'Lemons', 300, '2023-06-12 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (12, 'Limes', 200, '2023-06-14 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (13, 'Cantaloupes', 400, '2023-06-18 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (14, 'Honeydews', 300, '2023-06-22 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (15, 'Pears', 500, '2023-06-25 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (16, 'Plums', 600, '2023-07-01 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (17, 'Cherries', 400, '2023-07-05 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (18, 'Grapefruits', 300, '2023-07-08 00:00:00.000')")
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (19, 'Tangerines', 500, '2023-07-15 00:00:00.000')")
    conn.commit()
    conn.close()

@app.route('/backend/add_item', methods=['POST'])
def add_item():
    data = request.json
    conn = sqlite3.connect('inventory.db')
    c = conn.cursor()
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (?, ?, ?, ?)", (data['item_id'], data['item_name'], data['available_amount'], data['expiry_date']))
    conn.commit()
    conn.close()
    response = make_response(jsonify({'message': 'Item added successfully.'}), 201)
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5001'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    print(request.headers)

    return response

# update the item's expiry date
def update_item_expiry_date():
    conn = sqlite3.connect('inventory.db')
    c = conn.cursor()
    c.execute("SELECT * FROM inventory")
    items = c.fetchall()
    for item in items:
        item_id = item[0]
        expiry_date_str = item[3]
        expiry_date = datetime.strptime(expiry_date_str, "%Y-%m-%d %H:%M:%S.%f")
        if expiry_date < datetime.now():
            # if the expiry date has passed, remove the item from inventory
            c.execute("DELETE FROM inventory WHERE item_id=?", (item_id,))
    conn.commit()
    conn.close()



# remove the item's quantity
@app.route('/backend/remove_item_quantity', methods=['PUT'])
def remove_item_quantity():
    data = request.json
    item_id = data['item_id']
    amount = data['amount']
    
    conn = sqlite3.connect('inventory.db')
    c = conn.cursor()
    c.execute("SELECT * FROM inventory WHERE item_id=?", (item_id,))
    item = c.fetchone()
    if not item:
        response = make_response(jsonify({'error': 'Item not found in inventory.'}), 404)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5001'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        print(request.headers)

        return response
    
    available_amount = item[2]
    if amount > available_amount:
        response = make_response(jsonify({'error': 'Requested amount exceeds available amount.'}), 400)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5001'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        print(request.headers)

        return response   
         
    new_available_amount = available_amount - amount
    c.execute("UPDATE inventory SET available_amount=? WHERE item_id=?", (new_available_amount, item_id))
    conn.commit()
    conn.close()
    
    response = make_response(jsonify({'message': f'{amount} lbs of {item[1]} removed from inventory.'}), 200)
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5001'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    print(request.headers)

    return response   

#return inventory
@app.route('/backend/inventory', methods=['GET'])
def get_inventory():
    conn = sqlite3.connect('inventory.db')
    c = conn.cursor()
    c.execute("SELECT * FROM inventory")
    items = c.fetchall()
    conn.close()
    response = make_response(jsonify(items), 200)
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5001'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    print(request.headers)

    return response   


init_inventory_db()
#insert_items()
update_item_expiry_date()
if __name__ == '__main__':
    app.run()
