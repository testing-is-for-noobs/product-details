const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const database = mysql.createConnection(mysqlConfig);

const insertProduct = (p, callback) => {
  database.query(
    'insert into products (name, product_line, price, customer_limit, liked, category_1, category_2, category_3) values (?, ?, ?, ?, ?, ?, ?, ?)',
    [p.name, p.line, p.price, p.climit, p.liked, p.cat1, p.cat2, p.cat3],
    (error, results) => {
      callback(error, results);
    },
  );
};

const insertStore = (s, callback) => {
  database.query(
    'insert into stores (name, address, city, state, zip, phone, details) values (?, ?, ?, ?, ?, ?, ?)',
    [s.name, s.address, s.city, s.state, s.zip, s.phone, s.details],
    (error) => {
      callback(error);
    },
  );
};

const insertInventory = (i, callback) => {
  database.query(
    'insert into products (description, product_id, store_id) values (?, ?, ?, ?)',
    [i.name, i.line, i.climit, i.liked, i.cat1, i.cat2, i.cat3],
    (error) => {
      callback(error);
    },
  );
};

const getProduct = (pid, callback) => {
  database.query(
    'select * from products where id = ?',
    [pid],
    (error, results) => {
      callback(error, results);
    },
  );
};

module.exports = {
  insertProduct,
  insertStore,
  insertInventory,
  getProduct,
};
