import mysql.connector as msc
from mysql.connector import Error

def create_database(password):
    try:
        conn = msc.connect(
            host="localhost",
            user="root",
            passwd=password
        )
        if conn.is_connected():
            print("Connected to mysql server")
        cursor = conn.cursor()

        with open('creation_script.sql', 'r') as f:
            sql = f.read()
            opt=cursor.execute(sql,multi=True)
            for i in opt:
                print(i.rowcount)
        trigger_update_rating = """
        CREATE TRIGGER update_rating
        AFTER INSERT ON Product_Review
        FOR EACH ROW
        BEGIN
            DECLARE avg_rating FLOAT;
            SELECT AVG(rating) INTO avg_rating FROM Product_Review WHERE product_id = NEW.product_id;
            UPDATE Product SET rating = avg_rating WHERE product_id = NEW.product_id;
        END;
        """

        trigger_update_seller_rating = """
        CREATE TRIGGER update_seller_rating
        AFTER INSERT ON Seller_Review
        FOR EACH ROW
        BEGIN
            DECLARE avg_rating FLOAT;
            SELECT AVG(rating) INTO avg_rating FROM Seller_Review WHERE seller_id = NEW.seller_id;
            UPDATE Seller SET rating = avg_rating WHERE seller_id = NEW.seller_id;
        END;
        """

        cursor.execute(trigger_update_rating)
        cursor.execute(trigger_update_seller_rating)

        conn.commit()
        cursor.close()
        conn.close()
        print("Database operation completed")

    except Error as e:
        print(f"Error: {e}")

def add_data(password):
    try:
        conn = msc.connect(
            host="localhost",
            user="root",
            passwd=password
        )
        if conn.is_connected():
            print("Connected to mysql server")
        cursor = conn.cursor()

        with open('dummy_data.sql', 'r') as f:
            sql = f.read()
            opt=cursor.execute(sql,multi=True)
            for i in opt:
                print(i.rowcount)

        conn.commit()
        cursor.close()
        conn.close()
        print("Database operation completed")

    except Error as e:
        print(f"Error: {e}")
def check_database_exists(db_name, password):
    conn = msc.connect(
        host="localhost",
        user="root",
        passwd=password
    )
    cursor = conn.cursor()
    cursor.execute(f"SHOW DATABASES LIKE '{db_name}'")
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    if result:
        return True
    return False