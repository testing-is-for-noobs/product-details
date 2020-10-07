const mysql = require('mysql');
const Bluebird = require('bluebird');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);
const database = Bluebird.promisifyAll(connection);

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

const seedData = () => (
  Promise.all([
    database.queryAsync('select * from products'),
    database.queryAsync('select * from stores'),
  ])
);

const initialData = (pid) => (
  Promise.all([
    database.queryAsync(`select * from products where id = ${pid}`),
    database.queryAsync('select * from stores'),
    database.queryAsync(`select * from inventory where product_id = ${pid}`),
  ])
);

const getProduct = (pid, callback) => {
  database.query(
    'select * from products where id = ?',
    [pid],
    (error, results) => {
      callback(error, results);
    },
  );
};

const updateWishlist = (newStatus, pid, callback) => {
  database.query(
    'update products set liked = ? where id = ?',
    [newStatus, pid],
    (error, results) => {
      callback(error, results);
    },
  );
};

module.exports = {
  connection,
  insertProduct,
  insertStore,
  insertInventory,
  seedData,
  initialData,
  getProduct,
  updateWishlist,
};
