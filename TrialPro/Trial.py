# app.py
from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# MySQL Connection
connection = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="Sravya2000",  # Replace with your MySQL password
    database="farm_movement"
)

@app.route('/api/farms')
def get_farms():
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM population")
    farms = cursor.fetchall()
    cursor.execute("SELECT * FROM movements")
    other_data = cursor.fetchall()
    cursor.close()
    result = {
        "farms": farms,
        "other_data": other_data
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True,port=8080)
