from flask import Flask, request, jsonify, redirect
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os
import mysql.connector as msc
from database_creator import create_database, add_data, check_database_exists
from seller import seller
from user import user

def _build_cors_prelight_response():
    """
    Builds a CORS preflight response
    """
    response = jsonify()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

app = Flask(__name__)
CORS(app)
load_dotenv()

@app.route('/login', methods=['OPTIONS', 'POST'])
@cross_origin()
def login():
    """
    This function is used to verify the user credentials 
    and return the user_id/seller_id if the credentials are correct
    """
    sql_password = os.getenv('SQL_PASSWORD')
    conn = msc.connect(
        host="localhost",
        user="root",
        passwd=sql_password)
    # checkign database and creating if not exist
    if request.method == 'OPTIONS':
        return _build_cors_prelight_response()
    if not check_database_exists('scamazon', sql_password):
        create_database(sql_password)
        add_data(sql_password)
    cursor = conn.cursor()
    cursor.execute("USE scamazon")

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')
    print(f"username: {username}, password: {password}, role: {role}")
    # checking if the user exists in the database
    if role=="seller":
        # it is a seller
        cursor.execute(f'SELECT seller_id FROM Seller WHERE username="{username}" AND password="{password}"')
        print("Query executed:- ")
        print(f'SELECT seller_id FROM Seller WHERE username="{username}" AND password="{password}"')
    else:
        # it is a user
        cursor.execute(f'SELECT user_id FROM User WHERE username="{username}" AND password="{password}"')
        print("Query executed:- ")
        print(f'SELECT user_id FROM User WHERE username="{username}" AND password="{password}"')
    user = cursor.fetchone()
    # closing connection
    cursor.close()
    conn.close()
    if user:
        return jsonify({"verified": True, "id": user[0]}), 200
    else:
        return jsonify({"verified": False, "message": "Invalid credentials"}), 200
    

@app.route('/register', methods=['OPTIONS', 'POST'])
@cross_origin()
def register():
    """
    This function is used to register a new user/seller
    and return the user_id/seller_id
    """
    sql_password = os.getenv('SQL_PASSWORD')
    conn = msc.connect(
        host="localhost",
        user="root",
        passwd=sql_password)
    # checkign database and creating if not exist
    if request.method == 'OPTIONS':
        return _build_cors_prelight_response()
    if not check_database_exists('scamazon', sql_password):
        create_database(sql_password)
        add_data(sql_password)
    cursor = conn.cursor()
    cursor.execute("USE scamazon")
    data=request.get_json()
    role=data.get('role')
    if role=="seller":
        # seller id is of type S001 S002 etc
        cursor.execute("SELECT seller_id FROM Seller ORDER BY seller_id DESC LIMIT 1")
        seller_id=cursor.fetchone()[0]
        cursor.close()
        conn.close()
        seller_id=int(seller_id[1:])
        seller_id+=1
        seller_id="S"+str(seller_id)
        proprietor_name=data.get('p_name')
        shop_name=data.get('s_name')
        email=data.get('email')
        password=data.get('password')
        username=data.get('username')
        contact=data.get('contact')
        address=data.get('address')
        GSTIN=data.get('GSTIN')
        rating=0
        seller_obj=seller(seller_id,proprietor_name,shop_name,email,password,username,contact,address,GSTIN,rating)
        seller_obj.to_sql()
        return jsonify({"seller_id":seller_id})
    else:
        # user id is of type U001 U002 etc
        cursor.execute("SELECT user_id FROM User ORDER BY user_id DESC LIMIT 1")
        user_id=cursor.fetchone()[0]
        cursor.close()
        conn.close()
        user_id=int(user_id[1:])
        user_id+=1
        username=data.get('username')
        email=data.get('email')
        password=data.get('password')
        contact=data.get('contact')
        address=data.get('address')
        user_obj=user(user_id,username,email,password,contact,address)
        user_obj.to_sql()
        return jsonify({"user_id":user_id})
    

@app.route('/get_sellername', methods=['OPTIONS', 'POST'])
@cross_origin()
def get_sellername():
    """
    This function is used to get the name of the seller
    """
    if request.method == 'OPTIONS':
        return _build_cors_prelight_response()
    sql_password = os.getenv('SQL_PASSWORD')
    conn = msc.connect(
        host="localhost",
        user="root",
        passwd=sql_password)
    cursor = conn.cursor()
    cursor.execute("USE scamazon")
    data = request.get_json()
    seller_id = data.get('seller_id')
    cursor.execute(f'SELECT proprietor_name FROM Seller WHERE seller_id="{seller_id}"')
    name = cursor.fetchone()
    cursor.close()
    conn.close()
    if name:
        return jsonify({"name": name[0]}), 200
    else:
        return jsonify({"message": "Invalid seller_id"}), 200

@app.route('/seller/product', methods=['OPTIONS', 'POST'])
@cross_origin()
def seller_products():
    """
    This function is used to get the products of a seller
    It takes seller id as input and returns the products of the seller in json format
    with following attributes
    1. product_id
    2. product_name
    3. price
    4. stock
    """
    if request.method == 'OPTIONS':
        return _build_cors_prelight_response()
    sql_password = os.getenv('SQL_PASSWORD')
    conn = msc.connect(
        host="localhost",
        user="root",
        passwd=sql_password)
    cursor = conn.cursor()
    cursor.execute("USE scamazon")
    data = request.get_json()
    seller_id = data.get('seller_id')
    cursor.execute(f'SELECT product_id, Name, price, stock FROM Product WHERE seller_id="{seller_id}"')
    products = cursor.fetchall()
    cursor.close()
    conn.close()
    products_list = []  
    for product in products:
        products_list.append({"p_id": product[0], "p_name": product[1], "price": product[2], "qty": product[3]})
    return jsonify({"products": products_list}), 200

@app.route('/seller/order', methods=['OPTIONS', 'POST'])
@cross_origin()
def seller_orders():
    """
    This function is used to get the orders of a seller
    It takes seller id as input and returns the orders of the seller in json format
    with following attributes
    1. order_id
    2. product_id
    3. quantity
    4. p_price
    5. order_date
    6. product_name
    """
    if request.method == 'OPTIONS':
        return _build_cors_prelight_response()
    sql_password = os.getenv('SQL_PASSWORD')
    conn = msc.connect(
        host="localhost",
        user="root",
        passwd=sql_password)
    cursor = conn.cursor()
    cursor.execute("USE scamazon")
    data = request.get_json()
    seller_id = data.get('seller_id')
    cursor.execute(f'SELECT o.order_id, o.product_id, o.quantity, p.price, o.order_date, p.Name FROM Orders o JOIN Product p ON o.product_id = p.product_id WHERE o.seller_id="{seller_id}"')
    orders = cursor.fetchall()
    cursor.close()
    conn.close()
    orders_list = []
    for order in orders:
        orders_list.append({
            "order_id": order[0],
            "p_id": order[1], 
            "qty": order[2], 
            "p_price": order[3], 
            "order_date": order[4], 
            "p_name": order[5]})
        
    return jsonify({"orders": orders_list}), 200


if __name__ == '__main__':
    app.run(debug=True)
