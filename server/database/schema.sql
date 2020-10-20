DROP DATABASE IF EXISTS legoland;

CREATE DATABASE legoland;

\c legoland;

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name varchar (150) not null,
  product_line varchar (350),
  tag varchar (25),
  price NUMERIC (10, 2) not null,
  online_inventory BOOLEAN not null,
  rating NUMERIC (3, 2) not null,
  review_count int not null,
  customer_limit int not null,
  liked BOOLEAN not null,
  category_1 varchar (150),
  category_2 varchar (150),
  category_3 varchar (150)
);

CREATE TABLE IF NOT EXISTS stores (
  id SERIAL PRIMARY KEY,
  name varchar (150) not null,
  address varchar (250) not null,
  city varchar (150) not null,
  state varchar (2) not null,
  zip varchar (5) not null,
  phone varchar (12) not null,
  details varchar (350) not null
);

CREATE TABLE IF NOT EXISTS inventory (
  id SERIAL PRIMARY KEY,
  store_id int not null,
  product_id int not null,
  inventory int not null,
  foreign key (product_id) references products(id),
  foreign key (store_id) references stores(id)
);

COPY products
FROM 'C:\Users\jonfu86\work\SDC\product-details\products.csv'
DELIMITER ','
CSV HEADER;

COPY stores
FROM 'C:\Users\jonfu86\work\SDC\product-details\stores.csv'
DELIMITER ','
CSV HEADER;

COPY inventory
FROM 'C:\Users\jonfu86\work\SDC\product-details\inventory.csv'
DELIMITER ','
CSV HEADER;
