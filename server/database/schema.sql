DROP DATABASE IF EXISTS legoland;

CREATE DATABASE legoland;

USE legoland;

CREATE TABLE [IF NOT EXISTS] products (
  id SERIAL PRIMARY KEY,
  name varchar (150) UNIQUE not null,
  product_line varchar (350),
  tag int (1) not null,
  price NUMERIC (10, 2) not null,
  online_inventory BOOLEAN not null,
  rating NUMERIC (3, 2) not null,
  review_count int (5) not null,
  customer_limit int (2) not null,
  liked int (1) not null,
  category_1 varchar (150),
  category_2 varchar (150),
  category_3 varchar (150)
);

CREATE TABLE [IF NOT EXISTS] stores (
  id SERIAL PRIMARY KEY,
  name varchar (150) not null,
  address varchar (250) not null,
  city varchar (150) not null,
  state varchar (2) not null,
  zip varchar (5) not null,
  phone varchar (10) not null,
  details varchar (350) not null
);

CREATE TABLE [IF NOT EXISTS] inventory (
  id SERIAL PRIMARY KEY,
  inventory int(3) not null,
  product_id int(3) not null,
  store_id int(2) not null,
  foreign key (product_id) references products(id),
  foreign key (store_id) references stores(id)
);
