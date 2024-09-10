import mysql.connector as msc
import os
from dotenv import load_dotenv

class Transaction:
    transaction_id = None
    user_id = None
    order_id = None
    amount = None
    payment_date = None

    def __init__(self, transaction_id, user_id, order_id, amount, payment_date):
        self.transaction_id = transaction_id
        self.user_id = user_id
        self.order_id = order_id
        self.amount = amount
        self.payment_date = payment_date

    def to_sql(self):
        load_dotenv()
        con = msc.connect(host='localhost', user='root', password=os.getenv('sql_password'), database='Scamazon')
        cur = con.cursor()
        cur.execute(f"INSERT INTO Transaction VALUES('{self.transaction_id}', '{self.user_id}', '{self.order_id}', {self.amount}, '{self.payment_date}')")
        con.commit()
        con.close()

    def delete_sql(self):
        load_dotenv()
        con = msc.connect(host='localhost', user='root', password=os.getenv('sql_password'), database='Scamazon')
        cur = con.cursor()
        cur.execute(f"DELETE FROM Transaction WHERE transaction_id='{self.transaction_id}'")
        con.commit()
        con.close()

    def update_sql(self):
        load_dotenv()
        con = msc.connect(host='localhost', user='root', password=os.getenv('sql_password'), database='Scamazon')
        cur = con.cursor()
        cur.execute(f"UPDATE Transaction SET amount={self.amount}, payment_date='{self.payment_date}' WHERE transaction_id='{self.transaction_id}'")
        con.commit()
        con.close()
