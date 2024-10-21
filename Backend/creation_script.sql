-- Creating the database for the Scamazon project
CREATE DATABASE IF NOT EXISTS Scamazon;

USE Scamazon;

-- Creating tables for details refer to README.md
CREATE TABLE Seller (
    seller_id VARCHAR(6) NOT NULL PRIMARY KEY,
    proprietor_name VARCHAR(50) NOT NULL,
    shop_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    contact VARCHAR(10) NOT NULL UNIQUE,
    address VARCHAR(100) NOT NULL,
    GSTIN VARCHAR(15) NOT NULL UNIQUE,
    rating FLOAT NOT NULL
);

CREATE TABLE Product (
    product_id VARCHAR(6) NOT NULL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description VARCHAR(100),
    price FLOAT NOT NULL,
    stock INT NOT NULL,
    rating FLOAT,
    seller_id VARCHAR(6) NOT NULL,
    warranty FLOAT,
    offer FLOAT,
    FOREIGN KEY (seller_id) REFERENCES Seller(seller_id)
);

CREATE TABLE User (
    user_id VARCHAR(6) NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    contact VARCHAR(10) NOT NULL UNIQUE,
    address VARCHAR(100) NOT NULL
);

CREATE TABLE Orders (
    order_id VARCHAR(6) NOT NULL PRIMARY KEY,
    order_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    product_id VARCHAR(6) NOT NULL,
    user_id VARCHAR(6) NOT NULL,
    quantity INT NOT NULL,
    received_date DATE,
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Cart (
    user_id VARCHAR(6) NOT NULL,
    product_id VARCHAR(6) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

CREATE TABLE Product_Review (
    user_id VARCHAR(6) NOT NULL,
    product_id VARCHAR(6) NOT NULL,
    order_id VARCHAR(6) NOT NULL,
    rating FLOAT NOT NULL,
    review VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);
CREATE TABLE Transaction (
    transaction_id VARCHAR(6) NOT NULL PRIMARY KEY,
    user_id VARCHAR(6) NOT NULL,
    order_id VARCHAR(6) NOT NULL,
    amount FLOAT NOT NULL,
    payment_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);
CREATE TABLE Seller_Review (
    user_id VARCHAR(6) NOT NULL,
    seller_id VARCHAR(6) NOT NULL,
    order_id VARCHAR(6) NOT NULL,
    rating FLOAT NOT NULL,
    review VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (seller_id) REFERENCES Seller(seller_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

-- Triggers commenting trigers because they are causing errors with mysql connector so handeled separately in backend
-- DELIMITER //
-- CREATE TRIGGER update_rating
-- AFTER INSERT ON Product_Review
-- FOR EACH ROW
-- BEGIN
--     DECLARE avg_rating FLOAT;
--     SELECT AVG(rating) INTO avg_rating FROM Product_Review WHERE product_id = NEW.product_id;
--     UPDATE Product SET rating = avg_rating WHERE product_id = NEW.product_id;
-- END;
-- //
-- 
-- CREATE TRIGGER update_seller_rating
-- AFTER INSERT ON Seller_Review
-- FOR EACH ROW
-- BEGIN
--     DECLARE avg_rating FLOAT;
--     SELECT AVG(rating) INTO avg_rating FROM Seller_Review WHERE seller_id = NEW.seller_id;
--     UPDATE Seller SET rating = avg_rating WHERE seller_id = NEW.seller_id;
-- END;
-- //
-- 
-- DELIMITER ;