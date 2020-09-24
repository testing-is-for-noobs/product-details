DROP DATABASE IF EXISTS legoland;

CREATE DATABASE legoland;

USE legoland;

CREATE TABLE products (
  id int not null AUTO_INCREMENT,
  name varchar(150) not null,
  product_line varchar(350),
  customerlimit int,
  liked binary,
  category1 varchar(150),
  category2 varchar(150),
  category3 varchar(150),
  PRIMARY KEY (id)
);

CREATE TABLE stores (
  id int not null AUTO_INCREMENT,
  name varchar(150) not null,
  address varchar(250) not null,
  zip int(5) not null,
  phone int(10) not null,
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
