CREATE KEYSPACE product WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};

CREATE TABLE product.product_by_id (
  id INT PRIMARY KEY,
  name TEXT,
  product_line TEXT,
  tag TEXT,
  price DECIMAL (12, 2),
  online_inventory BOOLEAN,
  rating DECIMAL (3, 2),
  review_count INT,
  customer_limit SMALLINT,
  liked BOOLEAN,
  category_1 TEXT,
  category_2 TEXT,
  category_3 TEXT
  WITH comment = 'Q1. Find product by id'
);

CREATE KEYSPACE store WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};

CREATE TABLE store.store_by_id (
  id INT PRIMARY KEY,
  name TEXT,
  street TEXT,
  city TEXT,
  state TEXT,
  zip INT (5),
  phone TEXT,
  details TEXT
  WITH comment = 'Q2. Find store by id'
);


-- MIGHT BE REDUNDANT FOR UI
CREATE TABLE store.store_by_state_and_nearby_zip (
  id INT,
  name TEXT,
  street TEXT,
  city TEXT,
  state TEXT,
  zip INT (5),
  phone TEXT,
  details TEXT,
  PRIMARY KEY((state), zip)
  WITH comment = 'Q3. Find store by state and nearby zip'
);
-- SELECT * store.store_by_state_and_nearby_zip where state = '?' and zip >= zip - 100 and zip <= zip + 100;

-- create table for getting store by nearby zip and has product in inventory
CREATE TABLE store.store_by_nearby_zip_and_inventory (
  id INT,
  product_id INT,
  inventory INT(4),
  name TEXT,
  street TEXT,
  city TEXT,
  state TEXT,
  zip INT (5),
  phone TEXT,
  details TEXT,
  PRIMARY KEY((product_id, state), zip, inventory)
  WITH comment = 'Q4. Find store by product inventory and nearby zip code'
);
-- SELECT * store.store_by_nearby_zip_and_inventory where product_id = '?' and state = '?' and zip >= zip - 100 and zip <= zip + 100;

-- CREATE TABLE store.inventory_by_store_id_and_product_id (
--   product_id INT,
--   store_id INT,
--   inventory INT (4),
--   PRIMARY KEY((product_id, store_id), inventory)
--   WITH comment = 'Q5. Find inventory by store and product id'
-- );