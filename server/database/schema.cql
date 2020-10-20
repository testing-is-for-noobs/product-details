DROP KEYSPACE IF EXISTS product;

CREATE KEYSPACE product WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};

USE product;

CREATE TABLE product.product_by_id (
  id INT,
  name TEXT,
  product_line TEXT,
  tag TEXT,
  price DECIMAL,
  online_inventory BOOLEAN,
  rating DECIMAL,
  review_count INT,
  customer_limit SMALLINT,
  liked BOOLEAN,
  category_1 TEXT,
  category_2 TEXT,
  category_3 TEXT,
  PRIMARY KEY(id)
)
WITH comment = 'Q1. Find product by id';

DROP KEYSPACE IF EXISTS store;

CREATE KEYSPACE store WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};

USE store;

CREATE TABLE store.store_by_id (
  id INT,
  name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip INT,
  phone TEXT,
  details TEXT,
  PRIMARY KEY(id)
)
WITH comment = 'Q2. Find store by id';

CREATE TABLE store.store_by_nearby_zip_and_inventory (
  id INT,
  name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip INT,
  phone TEXT,
  details TEXT,
  product_id INT,
  inventory INT,
  PRIMARY KEY((product_id, state), zip, inventory)
)
WITH comment = 'Q3. Find store by product inventory and nearby zip code';

-- select * from store.store_by_nearby_zip_and_inventory WHERE product_id = 714 AND state = 'CA' AND zip >= 95300 AND zip <= 95700 ORDER BY zip ALLOW FILTERING;


-- SELECT * store.store_by_nearby_zip_and_inventory where product_id = '?' and state = '?' and zip >= zip - 100 and zip <= zip + 100;



COPY product.product_by_id (id, name, product_line, tag, price, online_inventory, rating, review_count, customer_limit, liked, category_1, category_2, category_3)
FROM '/mnt/c/Users/jonfu86/work/sdc/product-details/products.csv'
WITH DELIMITER=',' AND HEADER=TRUE;

COPY store.store_by_id (id, name, address, city, state, zip, phone, details)
FROM '/mnt/c/Users/jonfu86/work/sdc/product-details/stores.csv'
WTIH DELIMITER=',' AND HEADER=TRUE;

COPY store.store_by_nearby_zip_and_inventory (id, name, address, city, state, zip, phone, details, product_id, inventory)
FROM '/mnt/c/Users/jonfu86/work/sdc/product-details/bridge.csv'
WITH DELIMITER=',' AND HEADER=TRUE;