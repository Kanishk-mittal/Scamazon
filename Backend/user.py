import mysql.connector as msc 
import os
from dotenv import load_dotenv
class user:
    user_id=None
    username=None
    email=None
    password=None
    contact=None
    address=None
    def __init__(self,user_id,username,email,password,contact,address):
        self.user_id=user_id
        self.username=username
        self.email=email
        self.password=password
        self.contact=contact
        self.address=address
    def to_sql(self):
        load_dotenv()
        con=msc.connect(host='localhost',user='root',password=os.getenv('sql_password'),database='Scamazon')
        cur=con.cursor()
        cur.execute(f"INSERT INTO User VALUES('{self.user_id}','{self.username}','{self.email}','{self.password}','{self.contact}','{self.address}')")
        con.commit()
        con.close()
    def delete_sql(self):
        load_dotenv()
        con=msc.connect(host='localhost',user='root',password=os.getenv('sql_password'),database='Scamazon')
        cur=con.cursor()
        cur.execute(f"DELETE FROM User WHERE user_id='{self.user_id}'")
        con.commit()
        con.close()
    def update_sql(self):
        load_dotenv()
        con=msc.connect(host='localhost',user='root',password=os.getenv('sql_password'),database='Scamazon')
        cur=con.cursor()
        cur.execute(f"UPDATE User SET username='{self.username}',email='{self.email}',password='{self.password}',contact='{self.contact}',address='{self.address}' WHERE user_id='{self.user_id}'")
        con.commit()
        con.close()

