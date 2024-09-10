import mysql.connector as msc 
import os
from dotenv import load_dotenv

class cart:
    user_id=None
    product_id=None
    quantity=None
    def __init__(self,user_id,product_id,quantity):
        self.user_id=user_id
        self.product_id=product_id
        self.quantity=quantity
    def to_sql(self):
        load_dotenv()
        con=msc.connect(host='localhost',user='root',password=os.getenv('sql_password'),database='Scamazon')
        cur=con.cursor()
        cur.execute(f"INSERT INTO Cart VALUES({self.user_id},{self.product_id},{self.quantity})")
        con.commit()
        con.close()