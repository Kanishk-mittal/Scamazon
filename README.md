# Scamazon 
Scamazon is an e-commerce website where users can buy and sell products. It is a platform where sellers can list their products and buyers can purchase them. The website provides a user-friendly interface for both buyers and sellers to interact with the platform.
## Tech Stack
- Frontend: React.js
- Backend: Flask
- Database: MySQL

## Features
1. Customer portal
    1. login
    2. cart (add, remove, buy all, buy specific)
    3. past orders
    4. homepage (category wise)
    5. sorting products on basis of price, rating, buyer, offer
    6. review after buying product, (seller specific)
    7. search bar for products
    8. edit profile
2. Seller Portal
    1. login
    2. view stock (products on home page)
    3. update stock
    4. Show orders
    5. customer rating and review
    6. change price and other details
    7. add offer
    8. add new product
    9. remove product 
    10. edit profile
3. Orders
    1. Track order
    2. Cancel order
    3. Return order
    4. Review
    5. Payment history

## ER Diagram
![ER Diagram](./ER_diagram.png)

## Tables

### 1. Seller
| Column Name   | Data Type    | Constraints                |
|---------------|--------------|----------------------------|
| seller_id     | INT          | PRIMARY KEY, AUTO_INCREMENT|
| username      | VARCHAR(50)  | NOT NULL                   |
| email         | VARCHAR(100) | NOT NULL, UNIQUE           |
| password      | VARCHAR(255) | NOT NULL                   |
| address       | TEXT         |                            |
| profile_pic   | VARCHAR(255) |                            |
| age           | INT          |                            |
| contact       | VARCHAR(15)  |                            |
| dob           | DATE         |                            |
| shop_name     | VARCHAR(100) |                            |
| prop_name     | VARCHAR(100) |                            |
| GST_no        | VARCHAR(20)  | UNIQUE                     |

### 2. Product
| Column Name   | Data Type    | Constraints                |
|---------------|--------------|----------------------------|
| product_id    | INT          | PRIMARY KEY, AUTO_INCREMENT|
| product_name  | VARCHAR(100) | NOT NULL                   |
| category      | VARCHAR(50)  |                            |
| description   | TEXT         |                            |
| picture       | VARCHAR(255) |                            |
| rating        | DECIMAL(2,1) |                            |
| price         | DECIMAL(10,2)| NOT NULL                   |
| seller_id     | INT          | FOREIGN KEY (seller_id) REFERENCES Seller(seller_id)|
| stock_left    | INT          | NOT NULL                   |
| offer         | VARCHAR(100) |                            |
| warranty      | VARCHAR(100) |                            |

### 3. User
| Column Name   | Data Type    | Constraints                |
|---------------|--------------|----------------------------|
| user_id       | INT          | PRIMARY KEY, AUTO_INCREMENT|
| user_name     | VARCHAR(50)  | NOT NULL                   |
| date_of_birth | DATE         |                            |
| password      | VARCHAR(255) | NOT NULL                   |
| contact       | VARCHAR(15)  |                            |
| age           | INT          |                            |
| profile_pic   | VARCHAR(255) |                            |
| address       | TEXT         |                            |
| email         | VARCHAR(100) | NOT NULL, UNIQUE           |

### 4. Cart
| Column Name   | Data Type    | Constraints                |
|---------------|--------------|----------------------------|
| item_id       | INT          | PRIMARY KEY, AUTO_INCREMENT|
| user_id       | INT          | FOREIGN KEY (user_id) REFERENCES User(user_id)|
| product_id    | INT          | FOREIGN KEY (product_id) REFERENCES Product(product_id)|

### 5. Orders
| Column Name   | Data Type    | Constraints                |
|---------------|--------------|----------------------------|
| order_id      | INT          | PRIMARY KEY, AUTO_INCREMENT|
| product_id    | INT          | FOREIGN KEY (product_id) REFERENCES Product(product_id)|
| user_id       | INT          | FOREIGN KEY (user_id) REFERENCES User(user_id)|
| status        | VARCHAR(50)  |                            |
| order_date    | DATE         | NOT NULL                   |
| received_date | DATE         |                            |

### 6. Reviews
| Column Name   | Data Type    | Constraints                |
|---------------|--------------|----------------------------|
| review_id     | INT          | PRIMARY KEY, AUTO_INCREMENT|
| user_id       | INT          | FOREIGN KEY (user_id) REFERENCES User(user_id)|
| comments      | TEXT         |                            |
| ratings       | DECIMAL(2,1) |                            |

### 7. Reviews Of Product (N:M)
| Column Name   | Data Type    | Constraints                |
|---------------|--------------|----------------------------|
| review_id     | INT          | FOREIGN KEY (review_id) REFERENCES Reviews(review_id)|
| product_id    | INT          | FOREIGN KEY (product_id) REFERENCES Product(product_id)|
| PRIMARY KEY   | (review_id, product_id) |

### 8. User Buys Product (M:N)
| Column Name   | Data Type    | Constraints                |
|---------------|--------------|----------------------------|
| user_id       | INT          | FOREIGN KEY (user_id) REFERENCES User(user_id)|
| product_id    | INT          | FOREIGN KEY (product_id) REFERENCES Product(product_id)|
| PRIMARY KEY   | (user_id, product_id) |

### 9. Product and Seller
| Column Name   | Data Type    | Constraints                |
|---------------|--------------|----------------------------|
| product_id    | INT          | FOREIGN KEY (product_id) REFERENCES Product(product_id)|
| seller_id     | INT          | FOREIGN KEY (seller_id) REFERENCES Seller(seller_id)|
| PRIMARY KEY   | (product_id, seller_id) |


## Contributors
- [Kanishk mittal](https://github.com/Kanishk-mittal)
- [Sayan Sinha](https://github.com/sayan23bcy6)
- [Roshan Binoj](https://github.com/roshanbinoj-iiitk)
- [Nikhil Kumar](https://github.com/sawarn-nik)
- [Vishwanath praksah darur]()