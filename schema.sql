DROP DATABASE IF EXISTS legoland;

CREATE DATABASE legoland;

USE legoland;

CREATE TABLE products (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) not null,
  PRIMARY KEY (ID)
);

CREATE TABLE stores (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) not null,
  PRIMARY KEY (ID)
);

CREATE TABLE inventory (
  id int NOT NULL AUTO_INCREMENT,
  description varchar(50) not null,
  productId int,
  storeId int,
  foreign key (productId) references products(id),
  foreign key (storeId) references stores(id),
  PRIMARY KEY (ID)
);
