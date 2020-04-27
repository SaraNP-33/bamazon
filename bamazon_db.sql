CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products
(
    id INT NOT NULL AUTO_INCREMENT, 
    product VARCHAR (150) NOT NULL,
    price DECIMAL(4,2) DEFAULT 0,
    department VARCHAR(150) NOT NULL,
    stock_quantity INT DEFAULT 0,
    PRIMARY KEY (id)

);

INSERT INTO products (product,pricemdepartment,stock_quantity)
VALUES(Eloquent JavaScript, 23.99, Books, 200),
       (JavaScript: The Good Parts, 23.49, Books, 200) ,
       (Node.js Design Patterns, 31.19, Books, 150),
       (Logitech Mouse M570, 29.99, Electronics, 146),
       (SANWA Trackball Mouse, 34.99, Electronics, 130),
       (Kensington Expert Mouse, 67.91, Electronics,1),
       (Miles Davis -Kind of Blue, 18.14, Music, 30),
       (John Coltrane - A Love Supreme, 19.99, Music, 30),
       (Anita Baker - Rapture, 20.99, Music,20)
