DROP DATABASE IF EXISTS legoland;

CREATE DATABASE legoland;

USE legoland;

CREATE TABLE products (
  id int not null AUTO_INCREMENT,
  name varchar(150) not null,
  product_line varchar(350),
  tag int(1) not null,
  price decimal(10, 2) not null,
  rating decimal(3, 2) not null,
  online_inventory int(1) not null,
  review_count int(5) not null,
  customer_limit int(2) not null,
  liked int(1) not null,
  category_1 varchar(150),
  category_2 varchar(150),
  category_3 varchar(150),
  PRIMARY KEY (id)
);

CREATE TABLE stores (
  id int not null AUTO_INCREMENT,
  name varchar(150) not null,
  address varchar(250) not null,
  city varchar(150) not null,
  state varchar(2) not null,
  zip varchar(10) not null,
  phone varchar(30) not null,
  details varchar(350) not null,
  PRIMARY KEY (id)
);

CREATE TABLE inventory (
  id int not null AUTO_INCREMENT,
  inventory int(3) not null,
  product_id int(3) not null,
  store_id int(2) not null,
  foreign key (product_id) references products(id),
  foreign key (store_id) references stores(id),
  PRIMARY KEY (id)
);
