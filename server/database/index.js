const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const database = mysql.createConnection(mysqlConfig);

const insertProduct = (product, callback) => {
  database.query(
    'insert into products set ?',
    product,
    (error, results) => {
      callback(error, results);
    },
  );
};

const insertStore = (store, callback) => {
  database.query(
    'insert into stores set ?',
    store,
    (error) => {
      callback(error);
    },
  );
};

const insertInventory = (inventory, callback) => {
  database.query(
    'insert into inventory set ?',
    inventory,
    (error) => {
      callback(error);
    },
  );
};

const getAllProducts = (callback) => {
  database.query(
    'select * from products',
    (error, results) => {
      callback(error, results);
    },
  );
};

const getAllStores = (callback) => {
  database.query(
    'select * from stores',
    (error, results) => {
      callback(error, results);
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
  getAllProducts,
  getAllStores,
  insertInventory,
  getProduct,
};
