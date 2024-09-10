

import mysql.connector as msc 
import os
from dotenv import load_dotenv

class orders:
    order_id=None
    order_date=None	
    status=None	
    product_id=None	
    user_id=None	
    quantity=None	
    received_date=None
    def __init__(self, order_id, order_date, status, product_id, user_id, quantity, received_date):
        self.order_id=order_id
        self.order_date=order_date	
        self.status=status
        self.product_id=product_id	
        self.user_id=user_id
        self.quantity=quantity
        self.received_date=received_date
    def to_sql(self):
        load_dotenv()
        con=msc.connect(host='localhost',user='root',password=os.getenv('sql_password'),database='Scamazon')
        cur=con.cursor()
        cur.execute(f"INSERT INTO Orders VALUES({self.order_id},{self.order_date},{self.status},{self.product_id},{self.user_id},{self.quantity},{self.received_date})")
        con.commit()
        con.close()
    def delete_sql(self):
        load_dotenv()
        con=msc.connect(host='localhost',user='root',password=os.getenv('sql_password'),database='Scamazon')
        cur=con.cursor()
        cur.execute(f"DELETE FROM Orders WHERE order_id={self.order_id} AND product_id={self.product_id}")
        con.commit()
        con.close()
    def update_sql(self):
        load_dotenv()
        con=msc.connect(host='localhost',user='root',password=os.getenv('sql_password'),database='Scamazon')
        cur=con.cursor()
        cur.execute(f"UPDATE Orders SET quantity={self.quantity},order_date={self.order_date},status={self.status},received_date={self.received_date},order_id={self.order_id} WHERE user_id={self.user_id} AND product_id={self.product_id}")
        con.commit()
        con.close()