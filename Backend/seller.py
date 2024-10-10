import mysql.connector as msc 
import os
from dotenv import load_dotenv

class seller:
    seller_id=None
    proprietor_name=None
    shop_name=None
    email=None
    password=None
    username=None
    contact=None
    address=None
    GSTIN=None
    rating=None

    def __init__(self,seller_id,proprietor_name,shop_name,email,password,username,contact,address,GSTIN,rating):
        self.seller_id=seller_id
        self.proprietor_name=proprietor_name
        self.shop_name=shop_name
        self.email=email
        self.password=password
        self.username=username
        self.contact=contact
        self.address=address
        self.GSTIN=GSTIN
        self.rating=rating
    def to_sql(self):
        load_dotenv()
        con=msc.connect(host='localhost',user='root',password=os.getenv('sql_password'),database='Scamazon')
        cur=con.cursor()
        cur.execute(f"INSERT INTO Seller VALUES({self.seller_id},{self.proprietor_name},{self.shop_name},{self.email},{self.password},{self.username},{self.contact},{self.address},{self.GSTIN},{self.rating})")
        con.commit()
        con.close()
    def delete_sql(self):
        load_dotenv()
        con=msc.connect(host='localhost',user='root',password=os.getenv('sql_password'),database='Scamazon')
        cur=con.cursor()
        cur.execute(f"DELETE FROM Seller WHERE seller_id={self.seller_id} AND username={self.username}")
        con.commit()
        con.close()
    def update_sql(self):
        load_dotenv()
        con=msc.connect(host='localhost',user='root',password=os.getenv('sql_password'),database='Scamazon')
        cur=con.cursor()
        cur.execute(f"UPDATE Seller SET password={self.password},proprietor_name={self.proprietor_name},shop_name={self.shop_name},email={self.email},username={self.username},contact={self.contact},address={self.address},GSTIN={self.GSTIN},rating={self.rating} WHERE seller_id={self.seller_id}")
        con.commit()
        con.close()