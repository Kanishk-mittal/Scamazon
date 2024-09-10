import mysql.connector as msc
import os
from dotenv import load_dotenv

class ProductReview:
    user_id = None
    product_id = None
    order_id = None
    rating = None
    review = None

    def __init__(self, user_id, product_id, order_id, rating, review=None):
        self.user_id = user_id
        self.product_id = product_id
        self.order_id = order_id
        self.rating = rating
        self.review = review

    def to_sql(self):
        load_dotenv()
        con = msc.connect(host='localhost', user='root', password=os.getenv('sql_password'), database='Scamazon')
        cur = con.cursor()
        cur.execute(f"INSERT INTO Product_Review VALUES('{self.user_id}', '{self.product_id}', '{self.order_id}', {self.rating}, '{self.review}')")
        con.commit()
        con.close()

    def delete_sql(self):
        load_dotenv()
        con = msc.connect(host='localhost', user='root', password=os.getenv('sql_password'), database='Scamazon')
        cur = con.cursor()
        cur.execute(f"DELETE FROM Product_Review WHERE user_id='{self.user_id}' AND product_id='{self.product_id}' AND order_id='{self.order_id}'")
        con.commit()
        con.close()

    def update_sql(self):
        load_dotenv()
        con = msc.connect(host='localhost', user='root', password=os.getenv('sql_password'), database='Scamazon')
        cur = con.cursor()
        cur.execute(f"UPDATE Product_Review SET rating={self.rating}, review='{self.review}' WHERE user_id='{self.user_id}' AND product_id='{self.product_id}' AND order_id='{self.order_id}'")
        con.commit()
        con.close()
