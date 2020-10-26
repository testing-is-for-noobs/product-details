// const mysql = require('mysql');
const Bluebird = require('bluebird');
const postgresConfig = require('./postgres/config');
const cassandraConfig = require('./cassandra/config');

// const connection = mysql.createConnection(mysqlConfig);
// const database = Bluebird.promisifyAll(connection);

//postgress connect
const { Pool } = require('pg');
const pool = new Pool(postgresConfig);
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

//CRUD Product
const getProduct = (pid) => {
  return pool
    .connect()
    .then(client => {
      return client
        .query('SELECT * FROM products WHERE id = $1', [pid])
        .then(res => {
          client.release();
          return res.rows[0];
        })
        .catch(err => {
          client.release();
          console.error(err.stack);
        })
    })
};

const getStore = (sid) => {
  return pool
    .connect()
    .then(client => {
      return client
        .query('SELECT * FROM stores WHERE id = $1', [sid])
        .then(res => {
          client.release();
          return res.rows[0];
        })
        .catch(err => {
          client.release();
          console.error(err.stack);
        })
    })
};

const getNearbyWithInventory = (pid, zip, callback) => {
  const zipMin = zip - 500;
  const zipMax = zip + 500;
  return pool
    .connect()
    .then(client => {
      return client
        .query('SELECT * FROM stores LEFT JOIN inventory ON stores.id = inventory.store_id WHERE zip BETWEEN $1 and $2 and product_id = $3',
        [zipMin, zipMax, pid])
        .then(res => {
          client.release();
          return res.rows;
        })
        .catch(err => {
          client.release();
          console.error(err.stack);
        })
    })
};



// const insertProduct = (product, callback) => {
//   database.query(
//     'insert into products set ?',
//     product,
//     (error, results) => {
//       callback(error, results);
//     },
//   );
// };

// const getProduct = (pid, callback) => {
//   database.query(
//     'select * from products where id = ?',
//     [pid],
//     (error, results) => {
//       callback(error, results);
//     },
//   );
// };

// const deleteProduct = (pid, callback) => {
//   database.query(
//     'delete * from products where id = ?',
//     [pid],
//     (error, results) => {
//       callback(error, results);
//     },
//   );
// };
// const updateProduct = (product, callback) => {
//   database.query(
//     'update products set ? where id = ?',
//     [product, product.id],
//     (error, results) => {
//       callback(error, results);
//     },
//   );
// };

//CRUD Store
// const insertStore = (store, callback) => {
//   database.query(
//     'insert into stores set ?',
//     store,
//     (error) => {
//       callback(error);
//     },
//   );
// };

// const getStore = (sid, callback) => {
//   database.query(
//     'select * from stores where id = ?',
//     store,
//     (error) => {
//       callback(error);
//     },
//   );
// };

// const updateStore = (store, callback) => {
//   database.query(
//     'update stores set ? where id = ?',
//     [store, store.id],
//     (error) => {
//       callback(error);
//     },
//   );

// };

// const deleteStore = (sid, callback) => {
//   database.query(
//     'delete * from stores where id = ?',
//     store,
//     (error) => {
//       callback(error);
//     },
//   );
// };

//CRUD Inventory
const insertInventory = (inventory, callback) => {
  database.query(
    'insert into inventory set ?',
    inventory,
    (error) => {
      callback(error);
    },
  );
};

const deleteInventoryByStore = (sid, callback) => {
  database.query(
    'delete * from inventory where store_id = ?',
    sid,
    (error) => {
      callback(error);
    },
  );
};

const deleteInventoryByProduct = (pid, callback) => {
  database.query(
    'delete * from inventory where product_id = ?',
    pid,
    (error) => {
      callback(error);
    },
  );
};

const getInventory = (pid, sid, callback) => {
  database.query(
    'select * from inventory where product_id = ? and store_id = ?',
    [pid, sid],
    (error) => {
      callback(error);
    },
  );
};

const updateInventory = (inventory, callback) => {
  database.query(
    'update inventory set ? where id = ?',
    [inventory, inventory.id],
    (error) => {
      callback(error);
    },
  );
};

//get nearby stores
const getNearbyStores = (zip, callback) => {
  const zipMin = zip - 100;
  const zipMax = zip + 100;
  database.query(
    'select * from stores where zip >= ? and zip <= ?',
    [zipMin, zipMax],
    (error) => {
      callback(error);
    },
  );
};

//get nearby stores with inventory
// const getNearbyWithInventory = (pid, zip, callback) => {
//   const zipMin = zip - 100;
//   const zipMax = zip + 100;
//   database.query(
//     'select * from stores left join inventory on stores.id = inventory.store_id where zip >= ? and zip <= ? and product_id = ?',
//     [zipMin, zipMax, pid],
//     (error) => {
//       callback(error);
//     },
//   );
// };

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


module.exports = {
  seedData,
  initialData,
  getProduct,
  getStore,
  getNearbyWithInventory
};
