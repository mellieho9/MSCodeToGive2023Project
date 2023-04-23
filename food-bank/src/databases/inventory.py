from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

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
    conn.commit()
    conn.close()

@app.route('/add_item', methods=['POST'])
def add_item():
    data = request.json
    conn = sqlite3.connect('inventory.db')
    c = conn.cursor()
    c.execute("INSERT INTO inventory (item_id, item_name, available_amount, expiry_date) VALUES (?, ?, ?, ?)", (data['item_id'], data['item_name'], data['available_amount'], data['expiry_date']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Item added successfully.'}), 201

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
@app.route('/remove_item_quantity', methods=['PUT'])
def remove_item_quantity():
    data = request.json
    item_id = data['item_id']
    amount = data['amount']
    
    conn = sqlite3.connect('inventory.db')
    c = conn.cursor()
    c.execute("SELECT * FROM inventory WHERE item_id=?", (item_id,))
    item = c.fetchone()
    if not item:
        return jsonify({'error': 'Item not found in inventory.'}), 404
    
    available_amount = item[2]
    if amount > available_amount:
        return jsonify({'error': 'Requested amount exceeds available amount.'}), 400
    
    new_available_amount = available_amount - amount
    c.execute("UPDATE inventory SET available_amount=? WHERE item_id=?", (new_available_amount, item_id))
    conn.commit()
    conn.close()
    return jsonify({'message': f'{amount} lbs of {item[1]} removed from inventory.'}), 200


init_inventory_db()
update_item_expiry_date()
if __name__ == '__main__':
    app.run()