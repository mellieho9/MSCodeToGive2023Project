from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = '134737323'

# set up the partners database
def init_partners_db():
    conn = sqlite3.connect('partners.db')
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
    conn = sqlite3.connect('partners.db')
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

@app.route('/backend/add_user', methods=['POST'])
def add_user():
    data = request.json
    conn = sqlite3.connect('partners.db')
    c = conn.cursor()
    c.execute("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)", (data['email'], data['company_name'], data['location'], data['time_from'], data['time_to'], data['refrigeration_capacity']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'User added successfully.'}), 201

@app.route('/backend/get_user_from_email/<email>', methods=['GET'])
def get_user(email):
    conn = sqlite3.connect('partners.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE email=?", (email,))
    user = c.fetchone()
    conn.close()
    if user:
        return jsonify({'email': user[0], 'company_name': user[1], 'location': user[2], 'time_from': user[3], 'time_to': user[4], 'refrigeration_capacity': user[5]})
    else:
        return jsonify({'error': 'User not found'})
    
@app.route('/backend/update_user_from_email/<email>', methods=['PUT'])
def update_user(email):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    user = c.execute("SELECT * FROM users WHERE email=?", (email,)).fetchone()
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

@app.route('/backend/get_partner_by_id/<partner_id>', methods=['GET'])
def get_partner(partner_id):
    conn = sqlite3.connect('partners.db')
    c = conn.cursor()
    c.execute("SELECT * FROM partners WHERE partner_id=?", (partner_id,))
    partner = c.fetchone()
    conn.close()
    if partner:
        return jsonify({'partner_id': partner[0], 'email': partner[1], 'company_name': partner[2], 'location': partner[3], 'time_from': partner[4], 'time_to': partner[5], 'refrigeration_capacity': partner[6]})
    else:
        return jsonify({'error': 'Partner not found'})

@app.route('/backend/update_partner_by_id/<partner_id>', methods=['PUT'])
def update_partner(partner_id):
    conn = sqlite3.connect('partners.db')
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
    

init_partners_db()

if __name__ == '__main__':
    app.run()