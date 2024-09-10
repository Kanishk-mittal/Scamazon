import mysql.connector as msc
import os
from dotenv import load_dotenv

class Product:
    product_id = None
    name = None
    category = None
    description = None
    price = None
    stock = None
    rating = None
    seller_id = None
    warranty = None
    offer = None

    def __init__(self, product_id, name, category, price, stock, seller_id, description=None, rating=None, warranty=None, offer=None):
        self.product_id = product_id
        self.name = name
        self.category = category
        self.description = description
        self.price = price
        self.stock = stock
        self.rating = rating
        self.seller_id = seller_id
        self.warranty = warranty
        self.offer = offer

    def to_sql(self):
        load_dotenv()
        con = msc.connect(host='localhost', user='root', password=os.getenv('sql_password'), database='Scamazon')
        cur = con.cursor()
        cur.execute(f"INSERT INTO Product VALUES('{self.product_id}', '{self.name}', '{self.category}', '{self.description}', {self.price}, {self.stock}, {self.rating}, '{self.seller_id}', {self.warranty}, {self.offer})")
        con.commit()
        con.close()

    def delete_sql(self):
        load_dotenv()
        con = msc.connect(host='localhost', user='root', password=os.getenv('sql_password'), database='Scamazon')
        cur = con.cursor()
        cur.execute(f"DELETE FROM Product WHERE product_id='{self.product_id}'")
        con.commit()
        con.close()

    def update_sql(self):
        load_dotenv()
        con = msc.connect(host='localhost', user='root', password=os.getenv('sql_password'), database='Scamazon')
        cur = con.cursor()
        cur.execute(f"UPDATE Product SET name='{self.name}', category='{self.category}', description='{self.description}', price={self.price}, stock={self.stock}, rating={self.rating}, seller_id='{self.seller_id}', warranty={self.warranty}, offer={self.offer} WHERE product_id='{self.product_id}'")
        con.commit()
        con.close()
