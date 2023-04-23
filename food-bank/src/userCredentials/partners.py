from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = '134737323'

# set up the users database
def init_users_db():
    conn = sqlite3.connect('partners.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users 
                (email TEXT PRIMARY KEY,
                 company_name TEXT,
                 location TEXT,
                 time_from TEXT,
                 time_to TEXT,
                 refrigeration_capacity INTEGER)''')
    conn.commit()
    conn.close()

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    conn = sqlite3.connect('partners.db')
    c = conn.cursor()
    c.execute("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)", (data['email'], data['company_name'], data['location'], data['time_from'], data['time_to'], data['refrigeration_capacity']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'User added successfully.'}), 201

@app.route('/get_user/<email>', methods=['GET'])
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
    
@app.route('/update_user/<email>', methods=['PUT'])
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

init_users_db()
if __name__ == '__main__':
    app.run()