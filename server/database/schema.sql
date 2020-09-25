DROP DATABASE IF EXISTS legoland;

CREATE DATABASE legoland;

USE legoland;

CREATE TABLE products (
  id int not null AUTO_INCREMENT,
  name varchar(150) not null,
  product_line varchar(350),
  price varchar(10) not null,
  customer_limit int,
  liked binary,
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
  description varchar(250) not null,
  product_id int,
  store_id int,
  foreign key (product_id) references products(id),
  foreign key (store_id) references stores(id),
  PRIMARY KEY (id)
);
