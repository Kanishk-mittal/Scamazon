from flask import Flask, request, jsonify, redirect
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os
import mysql.connector as msc
from database_creator import create_database, add_data, check_database_exists
from seller import seller
from user import user
from product import Product

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
    cursor.execute(f'SELECT o.order_id, o.product_id, o.quantity, p.price, o.order_date, p.Name, o.status FROM Orders o JOIN Product p ON o.product_id = p.product_id WHERE p.seller_id="{seller_id}"')
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
            "status": order[6],
            "p_name": order[5]})
        
    return jsonify({"orders": orders_list}), 200

@app.route('/user/products', methods=['OPTIONS', 'POST'])
@cross_origin()
def user_products():
    """
    This function is used to get the products for a specific user.
    It takes user_id as input and returns the products available in json format
    with attributes:
    1. product_id
    2. product_name
    3. price
    4. stock
    5. description
    6. image_url
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
    
    # Fetch all products
    cursor.execute('SELECT product_id, Name, price, stock, description,category FROM Product')
    products = cursor.fetchall()
    cursor.close()
    conn.close()
    
    products_list = []  
    for product in products:
        products_list.append({
            "p_id": product[0], 
            "name": product[1], 
            "price": product[2], 
            "qty": product[3], 
            "description": product[4], 
            "image": f"/{product[0]}.png" ,
            "category" : product[5]
        })
    
    return jsonify({"products": products_list}), 200

@app.route('/get_username', methods=['OPTIONS', 'POST'])
@cross_origin()
def get_username():
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
    user_id = data.get('user_id')
    cursor.execute(f'SELECT username FROM User WHERE user_id="{user_id}"')
    name = cursor.fetchone()
    cursor.close()
    conn.close()
    if name:
        return jsonify({"name": name[0]}), 200
    else:
        return jsonify({"message": "Invalid seller_id"}), 200
    
@app.route('/cart/add', methods=['OPTIONS', 'POST'])
@cross_origin()
def cart_add():
    """
    This function is used to add a product to the cart
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
    data = request.get_json().get('body')
    # data is a string, convert it to dictionary
    data = eval(data)
    user_id = data.get('user_id')
    product_id = data.get('product_id')
    # get current value and increment by 1
    cursor.execute(f'SELECT quantity FROM Cart WHERE user_id="{user_id}" AND product_id="{product_id}"')
    qty = cursor.fetchone()
    if qty:
        cursor.execute(f'UPDATE Cart SET quantity={qty[0]+1} WHERE user_id="{user_id}" AND product_id="{product_id}"')
    else:
        cursor.execute(f'INSERT INTO Cart VALUES("{user_id}", "{product_id}", 1)')
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Product added to cart"}), 200

@app.route('/cart/remove', methods=['OPTIONS', 'POST'])
@cross_origin()
def cart_remove():
    """
    This function is used to remove a product from the cart
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
    user_id = data.get('user_id')
    product_id = data.get('product_id')
    # get current value and decrement by 1
    cursor.execute(f'SELECT quantity FROM Cart WHERE user_id="{user_id}" AND product_id="{product_id}"')
    qty = cursor.fetchone()
    if qty:
        if qty[0] > 1:
            cursor.execute(f'UPDATE Cart SET quantity={qty[0]-1} WHERE user_id="{user_id}" AND product_id="{product_id}"')
        else:
            cursor.execute(f'DELETE FROM Cart WHERE user_id="{user_id}" AND product_id="{product_id}"')
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Product removed from cart"}), 200

@app.route('/cart', methods=['OPTIONS', 'POST'])
@cross_origin()
def cart():
    """
    This function is used to get the cart of a user
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
    user_id = data.get('user_id')
    cursor.execute(f'SELECT c.product_id, p.Name, p.price, c.quantity FROM Cart c JOIN Product p ON c.product_id=p.product_id WHERE c.user_id="{user_id}"')
    cart = cursor.fetchall()
    cursor.close()
    conn.close()
    cart_list = []
    for item in cart:
        cart_list.append({"p_id": item[0], "p_name": item[1], "price": item[2], "qty": item[3]})
    return jsonify({"cart": cart_list}), 200

@app.route('/updateStock', methods=['OPTIONS', 'POST'])
@cross_origin()
def update_stock():
    """
    This function is used to update the stock of a product
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
    print(data)
    product_id = data.get('p_id')
    stock = data.get('quantity')
    cursor.execute(f'UPDATE Product SET stock=stock+{stock} WHERE product_id="{product_id}"')
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Stock updated"}), 200

@app.route('/dispatch', methods=['OPTIONS', 'POST'])
@cross_origin()
def dispatch():
    """
    This function is used to update the stock of a product
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
    print(data)
    order_id = data.get('order_id')
    cursor.execute(f'UPDATE Orders SET status="Shipped" WHERE order_id="{order_id}"')
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Order dispatched"}), 200


def get_next_product_id():
    load_dotenv()
    con = msc.connect(host='localhost', user='root', password=os.getenv('sql_password'), database='Scamazon')
    cur = con.cursor()
    cur.execute("SELECT product_id FROM Product ORDER BY product_id DESC LIMIT 1")
    last_id = cur.fetchone()
    cur.close()
    con.close()
    if last_id:
        last_id_num = int(last_id[0][1:])
        next_id_num = last_id_num + 1
        next_id = f'P{next_id_num:03}'
    else:
        next_id = 'P001'
    return next_id

@app.route('/add_product', methods=['OPTIONS', 'POST'])
@cross_origin()
def add_product():
    if request.method == 'OPTIONS':
        return _build_cors_prelight_response()
    seller_id = request.form.get('seller_id')
    name = request.form.get('name')
    category = request.form.get('category')
    description = request.form.get('description')
    price = request.form.get('price')
    stock = request.form.get('stock')
    warranty = request.form.get('warranty')
    offer = request.form.get('offer')
    rating = 5 

    product_id = get_next_product_id()
    if not product_id:
        return jsonify({'message': 'Error generating product ID'})

    new_product = Product(
        product_id=product_id,
        name=name,
        category=category,
        description=description,
        price=price,
        stock=stock,
        rating=rating,
        seller_id=seller_id,
        warranty=warranty,
        offer=offer
    )
    try:
        new_product.to_sql()
        response = {'message': 'Product added successfully'}
    except Exception as e:
        response = {'message': f'Error adding product: {str(e)}'}

    # Save the image
    file = request.files['file']
    if file:
        # SAVE IN Frontend\public
        file.save(f'../Frontend/public/{product_id}.png')

    return jsonify(response)

@app.route('/user/orders', methods=['OPTIONS', 'POST'])
@cross_origin()
def user_orders():
    """
    This function is used to get the orders for a specific user.
    It takes user_id as input and returns the orders in JSON format
    with attributes:
    1. order_id
    2. product_id
    3. quantity
    4. price
    5. order_date
    6. status
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
    user_id = data.get('user_id')
    
    cursor.execute(f'''
        SELECT o.order_id, o.product_id, o.quantity, p.price, o.order_date, o.status
        FROM Orders o
        JOIN Product p ON o.product_id = p.product_id
        WHERE o.user_id="{user_id}"
    ''')
    orders = cursor.fetchall()
    cursor.close()
    conn.close()
    
    orders_list = []
    for order in orders:
        orders_list.append({
            "order_id": order[0],
            "p_id": order[1],
            "qty": order[2],
            "price": order[3],
            "order_date": order[4],
            "status": order[5],
        })
        
    return jsonify({"orders": orders_list}), 200


if __name__ == '__main__':
    app.run(debug=True)
