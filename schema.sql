DROP DATABASE if exists bamazon; 

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name TEXT NOT NULL,
    department_name TEXT NOT NULL,
    price DEC (10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
   primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Game of Thrones Season 1 DVD Pack", "Electronics", 19.99, 8),
("Toaster Oven", "Appliances", 29.99, 12),
("Ice Chest", "Outdoors", 40.00, 17),
("BBQ Grill", "Outdoors", 200.00, 6),
("Shoes", "Apparel", 15.00, 25),
("Mascara", "Cosmetics", 11.99, 15),
("Gears of War 5", "Electronics", 49.99, 7),
("TV", "Electronics", 400.00, 11),
("Monitor", "Electronics", 129.99, 5),
("Pajamas", "Apparel", 10.00, 23);
