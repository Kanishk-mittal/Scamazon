# Scamazon Overview

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

## Tables

### user 
    1. user id
    2. username
    3. email
    4. password
    5. address (street, city, district, state, pincode)
    6. profile_pic (will save with name as username in a folder in backend and the location of that will be saved in database)
    7. age
    8. contact number
    9. Date of birth

### seller
    1. seller id
    2. username (primary key)
    3. email
    4. password
    5. address (street, city, district, state, pincode)
    6. profile_pic (will save with name as username in a folder in backend and the location of that will be saved in database)
    7. age
    8. contact number 
    9. Date of birth
    10. shop name
    11. proprietor name
    12. GST no

### product
    1. product id
    2. product name
    3. category
    4. description
    5. picture (will save with name as product id in a folder in backend and the location of that will be saved in database)
    6. rating
    7. price
    8. seller id
    9. stock left
    10. offer
    11. warranty

### cart
    1. item id
    2. user id
    3. product id
