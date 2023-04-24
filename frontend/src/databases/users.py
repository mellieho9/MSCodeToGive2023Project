from flask import Flask, jsonify, request, make_response, session, redirect, url_for, send_file, g
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
from flask_cors import CORS


DATABASE = 'users.db'

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = '134737323'


def get_db(database):
    """Get a connection to the database"""
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(database)
    return db



@app.teardown_appcontext
def close_connection(exception):
    """Close the database connection at the end of a request"""
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()



def create_table():
    with app.app_context():
        conn = get_db(DATABASE)
        c = conn.cursor()
        c.execute('''CREATE TABLE IF NOT EXISTS users 
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL)''')
        conn.commit()
        conn.close()
    

@app.route('/databases/register', methods=['POST'])
def register():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')

    conn = get_db(DATABASE)
    c = conn.cursor()


    # Check if the email already exists in the database
    c.execute('SELECT id FROM users WHERE email = ?', (email,))
    result = c.fetchone()

    if result is not None:
        # Email already exists, return an error response
        conn.close()
        response = make_response(jsonify({'error': 'Email already registered.'}), 400)
        response.status_code = 400
        return response
    else:
        c.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', (name, email, generate_password_hash(password)))
        conn.commit()
        conn.close()
        response = make_response(jsonify({'message': 'Login successful!'}), 200)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5001'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response
        

@app.route('/databases/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    conn = get_db(DATABASE)
    c = conn.cursor()
    c.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = c.fetchone()
    conn.close()

    if user and check_password_hash(user[3], password):
        session['logged_in'] = True
         # redirect to the home page
        response = make_response(jsonify({'message': 'Login successful!'}), 200)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5001'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        print(request.headers)

        return response
    else:
        response = make_response(jsonify({'message': 'Invalid email or password'}), 401)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5001'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        print(request.headers)

        return response
    
@app.route('/databases/currentUser', methods=['GET'])
def get_current_user():
    if 'logged_in' in session and session['logged_in']:
        conn = get_db(DATABASE)
        c = conn.cursor()
        c.execute('SELECT name FROM users WHERE email = ?', (session['email'],))
        name = c.fetchone()[0]
        conn.close()
        return jsonify({'name': name})
    else:
        return jsonify({'name': ''})
    
# set up the inventory database
def init_inventory_db():
    conn = get_db('inventory.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS inventory 
                (item_id INTEGER PRIMARY KEY,
                 item_name TEXT,
                 available_amount INTEGER,
                 expiry_date TEXT)''')
    conn.commit()
    conn.close()

@app.route('/databases/add_item', methods=['POST'])
def add_item():
    data = request.json
    conn = get_db('inventory.db')
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
    conn = get_db('inventory.db')
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
@app.route('/databases/remove_item_quantity', methods=['PUT'])
def remove_item_quantity():
    data = request.json
    item_id = data['item_id']
    amount = data['amount']
    
    conn = get_db('inventory.db')
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
@app.route('/databases/inventory', methods=['GET'])
def get_inventory():
    conn = get_db('inventory.db')
    c = conn.cursor()
    c.execute("SELECT * FROM inventory")
    items = c.fetchall()
    conn.close()
    response = make_response(jsonify(items), 200)
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5001'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    print(request.headers)

    return response   

# set up the orders database
def init_orders_db():
    conn = get_db('orders.db')
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
        conn = get_db('orders.db')
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
    conn = get_db('partners.db')
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
    
# set up the partners database
def init_partners_db():
    conn = get_db('partners.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS partners 
                (partner_id INTEGER PRIMARY KEY AUTOINCREMENT,
                 email TEXT,
                 company_name TEXT,
                 location TEXT,
                 time_from TEXT,
                 time_to TEXT,
                 refrigeration_capacity INTEGER)''')
    conn.commit()
    conn.close()

# populate dummy data in the partners database
def populate_partners_db():
    conn = get_db('partners.db')
    c = conn.cursor()
    c.execute("INSERT INTO partners (email, company_name, location, time_from, time_to, refrigeration_capacity) VALUES (?, ?, ?, ?, ?, ?)",
          ('hey@gmail.com', 'Alpharetta Food Bank', 'Alpharetta, GA', '09:00:00', '17:00:00', 500))
    c.execute("INSERT INTO partners (email, company_name, location, time_from, time_to, refrigeration_capacity) VALUES (?, ?, ?, ?, ?, ?)",
            ('example@gmail.com', 'Georgia Cupboard', 'Roswell, GA', '08:00:00', '16:00:00', 800))
    c.execute("INSERT INTO partners (email, company_name, location, time_from, time_to, refrigeration_capacity) VALUES (?, ?, ?, ?, ?, ?)",
            ('partner1@gmail.com', 'Peachtree Food Bank', 'Atlanta, GA', '10:00:00', '18:00:00', 750))
    c.execute("INSERT INTO partners (email, company_name, location, time_from, time_to, refrigeration_capacity) VALUES (?, ?, ?, ?, ?, ?)",
            ('partner2@gmail.com', 'Buckhead Food Bank', 'Atlanta, GA', '08:00:00', '16:00:00', 500))
    c.execute("INSERT INTO partners (email, company_name, location, time_from, time_to, refrigeration_capacity) VALUES (?, ?, ?, ?, ?, ?)",
            ('partner3@gmail.com', 'Midtown Food Bank', 'Atlanta, GA', '09:00:00', '17:00:00', 600))
    c.execute("INSERT INTO partners (email, company_name, location, time_from, time_to, refrigeration_capacity) VALUES (?, ?, ?, ?, ?, ?)",
            ('partner4@gmail.com', 'Cascade Afterschool Program', 'Atlanta, GA', '11:00:00', '19:00:00', 400))
    c.execute("INSERT INTO partners (email, company_name, location, time_from, time_to, refrigeration_capacity) VALUES (?, ?, ?, ?, ?, ?)",
            ('partner5@gmail.com', 'East Point Food Pantry', 'East Point, GA', '10:00:00', '18:00:00', 650))
    c.execute("INSERT INTO partners (email, company_name, location, time_from, time_to, refrigeration_capacity) VALUES (?, ?, ?, ?, ?, ?)",
            ('partner6@gmail.com', 'Cumberland Community Center', 'Smyrna, GA', '08:00:00', '16:00:00', 700))
    c.execute("INSERT INTO partners (email, company_name, location, time_from, time_to, refrigeration_capacity) VALUES (?, ?, ?, ?, ?, ?)",
            ('partner7@gmail.com', 'Grant Park Food Pantry', 'Atlanta, GA', '10:00:00', '18:00:00', 550))
    c.execute("INSERT INTO partners (email, company_name, location, time_from, time_to, refrigeration_capacity) VALUES (?, ?, ?, ?, ?, ?)",
          ('partner8@gmail.com', 'Marietta Soup Kitchen', 'Marietta, GA', '09:00:00', '17:00:00', 450))

    conn.commit()
    conn.close()

@app.route('/databases/add_user', methods=['POST'])
def add_user():
    data = request.json
    conn = get_db('partners.db')
    c = conn.cursor()
    c.execute("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)", (data['email'], data['company_name'], data['location'], data['time_from'], data['time_to'], data['refrigeration_capacity']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'User added successfully.'}), 201

@app.route('/databases/get_user_from_email/<email>', methods=['GET'])
def get_user(email):
    conn = get_db('partners.db')
    c = conn.cursor()
    c.execute("SELECT * FROM partners WHERE email=?", (email,))
    user = c.fetchone()
    conn.close()
    if user:
        return jsonify({'email': user[0], 'company_name': user[1], 'location': user[2], 'time_from': user[3], 'time_to': user[4], 'refrigeration_capacity': user[5]})
    else:
        return jsonify({'error': 'User not found'})
    
@app.route('/databases/update_user_from_email/<email>', methods=['PUT'])
def update_user(email):
    conn = get_db('partners.db')
    c = conn.cursor()
    user = c.execute("SELECT * FROM partners WHERE email=?", (email,)).fetchone()
    if not user:
        return jsonify({'error': 'User not found'})
    else:
        company_name = request.json.get('company_name', user[1])
        location = request.json.get('location', user[2])
        time_from = request.json.get('time_from', user[3])
        time_to = request.json.get('time_to', user[4])
        refrigeration_capacity = request.json.get('refrigeration_capacity', user[5])
        c.execute("UPDATE users SET company_name=?, location=?, time_from=?, time_to=?, refrigeration_capacity=? WHERE email=?", (company_name, location, time_from, time_to, refrigeration_capacity, email))
        conn.commit()
        conn.close()
        return jsonify({'message': 'User updated successfully'})

@app.route('/databases/get_partner_by_id/<partner_id>', methods=['GET'])
def get_partner(partner_id):
    conn = get_db('partners.db')
    c = conn.cursor()
    c.execute("SELECT * FROM partners WHERE partner_id=?", (partner_id,))
    partner = c.fetchone()
    conn.close()
    if partner:
        return jsonify({'partner_id': partner[0], 'email': partner[1], 'company_name': partner[2], 'location': partner[3], 'time_from': partner[4], 'time_to': partner[5], 'refrigeration_capacity': partner[6]})
    else:
        return jsonify({'error': 'Partner not found'})

@app.route('/databases/update_partner_by_id/<partner_id>', methods=['PUT'])
def update_partner(partner_id):
    conn = get_db('partners.db')
    c = conn.cursor()
    partner = c.execute("SELECT * FROM partners WHERE partner_id=?", (partner_id,)).fetchone()
    if not partner:
        return jsonify({'error': 'Partner not found'})
    else:
        email = request.json.get('email', partner[1])
        company_name = request.json.get('company_name', partner[2])
        location = request.json.get('location', partner[3])
        time_from = request.json.get('time_from', partner[4])
        time_to = request.json.get('time_to', partner[5])
        refrigeration_capacity = request.json.get('refrigeration_capacity', partner[6])
        c.execute("UPDATE partners SET email=?, company_name=?, location= ?, time_from=?, time_to=?, refrigeration_capacity=? WHERE partnerID=?", (email, company_name, location, time_from, time_to, refrigeration_capacity, partnerID))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Partner updated successfully'})

@app.route('/databases/partner_info', methods=['GET'])
def get_partner_info():
    current_user = get_current_user()
    email = current_user['email']
    user_data = get_user(email)
    partner_data = {
        'PartnerId': user_data['id'],
        'PartnerName': user_data['company_name'],
        'PartnerLocation': user_data['location'],
        'AvailabilityTimeFrom': user_data['time_from'],
        'AvailabilityTimeTo': user_data['time_to'],
        'RefrigerationCapacity': user_data['refrigeration_capacity']
    }
    return jsonify(partner_data)

if __name__ == '__main__':
    app.run(port=3000, debug=True)