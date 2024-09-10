import mysql.connector as msc 
import os
from dotenv import load_dotenv

class seller_review:
    user_id=None
    seller_id=None
    order_id=None
    rating=None
    review=None
    def __init__(self,user_id,seller_id,order_id,rating,review):
        self.user_id=user_id
        self.seller_id=seller_id
        self.order_id=order_id
        self.rating=rating
        self.review=review
    def to_sql(self):
        load_dotenv()
        con=msc.connect(host='localhost',user='root',password=os.getenv('sql_password'),database='Scamazon')
        cur=con.cursor()
        cur.execute(f"INSERT INTO Seller_Review VALUES('{self.user_id}','{self.seller_id}','{self.order_id}','{self.rating}','{self.review}')")
        con.commit()
        con.close()
    def delete_sql(self):
        load_dotenv()
        con=msc.connect(host='localhost',user='root',password=os.getenv('sql_password'),database='Scamazon')
        cur=con.cursor()
        cur.execute(f"DELETE FROM Seller_Review WHERE user_id='{self.user_id}' AND seller_id='{self.seller_id}' AND order_id='{self.order_id}'")
        con.commit()
        con.close()
    def update_sql(self):
        load_dotenv()
        con=msc.connect(host='localhost',user='root',password=os.getenv('sql_password'),database='Scamazon')
        cur=con.cursor()
        cur.execute(f"UPDATE Seller_Review SET rating='{self.rating}',review='{self.review}' WHERE user_id='{self.user_id}' AND seller_id='{self.seller_id}' AND order_id='{self.order_id}'")
        con.commit()
        con.close()
        