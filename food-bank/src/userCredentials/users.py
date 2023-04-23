from flask import Flask, jsonify, request, make_response, session, redirect, url_for, send_file, g
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
from flask_cors import CORS
DATABASE = 'users.db'

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = '134737323'


def get_db():
    """Get a connection to the database"""
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db



@app.teardown_appcontext
def close_connection(exception):
    """Close the database connection at the end of a request"""
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()



def create_table():
    with app.app_context():
        conn = get_db()
        c = conn.cursor()
        c.execute('''CREATE TABLE IF NOT EXISTS users 
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL)''')
        conn.commit()
        conn.close()
    

@app.route('/userCredentials/register', methods=['POST'])
def register():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')

    conn = get_db()
    c = conn.cursor()
    c.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', (name, email, generate_password_hash(password)))
    conn.commit()
    conn.close()
    response = make_response(jsonify({'message': 'Login successful!'}), 200)
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5001'
    response.headers['Access-Control-Allow-Credentials'] = 'true'

    return response

@app.route('/userCredentials/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    conn = get_db()
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
if __name__ == '__main__':
    create_table()
    app.run(port=3000, debug=True)