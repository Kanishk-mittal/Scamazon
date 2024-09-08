-- Use the Scamazon database
USE Scamazon;

-- Insert data into Seller table
INSERT INTO Seller (seller_id, proprietor_name, shop_name, email, password, username, contact, address, GSTIN, rating) VALUES
('S001', 'John Doe', 'John Electronics', 'john@example.com', 'password123', 'johnDoe', '9876543210', '123 Main St', 'GST1234567890123', 4.5),
('S002', 'Jane Smith', 'Jane Boutique', 'jane@example.com', 'pass456', 'janeSmith', '8765432109', '456 Elm St', 'GST9876543210123', 4.0),
('S003', 'Alice Johnson', 'Alice’s Artifacts', 'alice@example.com', 'alicepass', 'aliceJohnson', '7654321098', '789 Maple St', 'GST3456789012345', 4.8),
('S004', 'Bob Brown', 'Bob’s Books', 'bob@example.com', 'bobpass', 'bobBrown', '6543210987', '101 Birch St', 'GST4567890123456', 4.2),
('S005', 'Carol White', 'Carol’s Crafts', 'carol@example.com', 'carolpass', 'carolWhite', '5432109876', '202 Cedar St', 'GST5678901234567', 4.6);

-- Insert data into User table
INSERT INTO User (user_id, username, email, password, contact, address) VALUES
('U001', 'alice', 'alice@example.com', 'alicepass', '9988776655', '789 Oak St'),
('U002', 'bob', 'bob@example.com', 'bobpass', '8877665544', '101 Pine St'),
('U003', 'charlie', 'charlie@example.com', 'charliepass', '7766554433', '303 Walnut St'),
('U004', 'david', 'david@example.com', 'davidpass', '6655443322', '404 Maple St'),
('U005', 'eve', 'eve@example.com', 'evepass', '5544332211', '505 Birch St');

-- Insert data into Product table
INSERT INTO Product (product_id, Name, category, description, price, stock, rating, seller_id, warranty, offer) VALUES
('P001', 'Laptop', 'Electronics', 'High-performance laptop', 800.0, 10, 4.6, 'S001', 1.0, 10.0),
('P002', 'Shirt', 'Apparel', 'Cotton casual shirt', 20.0, 100, 4.2, 'S002', 0.5, 15.0),
('P003', 'Headphones', 'Electronics', 'Noise-cancelling headphones', 150.0, 50, 4.7, 'S003', 1.0, 20.0),
('P004', 'Book', 'Books', 'Interesting novel', 25.0, 200, 4.4, 'S004', 0.0, 5.0),
('P005', 'Craft Kit', 'Crafts', 'DIY craft kit for beginners', 30.0, 75, 4.9, 'S005', 0.0, 10.0);

-- Insert data into Orders table
INSERT INTO Orders (order_id, order_date, status, product_id, user_id, quantity, received_date) VALUES
('O001', '2023-09-01', 'Shipped', 'P001', 'U001', 1, '2023-09-05'),
('O002', '2023-09-02', 'Delivered', 'P002', 'U002', 2, '2023-09-06'),
('O003', '2023-09-03', 'Processing', 'P003', 'U003', 1, NULL),
('O004', '2023-09-04', 'Shipped', 'P004', 'U004', 3, '2023-09-07'),
('O005', '2023-09-05', 'Delivered', 'P005', 'U005', 1, '2023-09-08');

-- Insert data into Cart table
INSERT INTO Cart (user_id, product_id, quantity) VALUES
('U001', 'P001', 1),
('U002', 'P002', 2),
('U003', 'P003', 1),
('U004', 'P004', 3),
('U005', 'P005', 1);

-- Insert data into Product_Review table
INSERT INTO Product_Review (user_id, product_id, order_id, rating, review) VALUES
('U001', 'P001', 'O001', 4.5, 'Great laptop, fast performance!'),
('U002', 'P002', 'O002', 4.0, 'Comfortable and good quality shirt'),
('U003', 'P003', 'O003', 4.7, 'Excellent sound quality'),
('U004', 'P004', 'O004', 4.3, 'Engaging read, worth the price'),
('U005', 'P005', 'O005', 4.9, 'Fantastic craft kit, very detailed instructions');

-- Insert data into Transaction table
INSERT INTO Transaction (transaction_id, user_id, order_id, amount, payment_date) VALUES
('T001', 'U001', 'O001', 800.0, '2023-09-01'),
('T002', 'U002', 'O002', 40.0, '2023-09-02'),
('T003', 'U003', 'O003', 150.0, '2023-09-03'),
('T004', 'U004', 'O004', 75.0, '2023-09-04'),
('T005', 'U005', 'O005', 30.0, '2023-09-05');

-- Insert data into Seller_Review table
INSERT INTO Seller_Review (user_id, seller_id, order_id, rating, review) VALUES
('U001', 'S001', 'O001', 4.7, 'Good service and fast delivery'),
('U002', 'S002', 'O002', 4.3, 'Good quality, on-time delivery'),
('U003', 'S003', 'O003', 4.8, 'Excellent customer support'),
('U004', 'S004', 'O004', 4.5, 'Reliable service, fast shipping'),
('U005', 'S005', 'O005', 4.9, 'Highly satisfied with the product');
