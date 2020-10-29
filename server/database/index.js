const Bluebird = require('bluebird');
const config = require('./connect_config');


//postgress connect
const { Pool, Client } = require('pg');
const pool = new Pool(config);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

//CRUD Product
const getProduct = (pid) => {
  return pool
    .query('SELECT * FROM products WHERE id = $1', [pid])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.error(err.stack);
    })

};

const addProduct = (product) => {
  const values = Object.values(product);
  // console.log(product);
  return pool
    .query('INSERT INTO products VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', values)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error(err.stack);
    })
};

const updateProduct = (pid, product) => {
  const columns = Object.keys(product);
  const values = Object.values(product);
  let query = 'UPDATE products SET ';

  for(var i = 0; i < columns.length; i++) {
    query += `${columns[i]} = $${i+2}`;
    if(i < columns.length - 1) {
      query += ', ';
    }
  }

  query += ' WHERE id = $1';

  const params = [pid, ...values];

  return pool
    .query(query, params)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error(err.stack);
    })
};

const deleteProduct = (pid) => {
  return pool
    .query('DELETE FROM products WHERE id = $1', [pid])
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error(err.stack);
    })
};


//STORE CRUD
const getStore = (sid) => {
  return pool
    .query('SELECT * FROM stores WHERE id = $1', [sid])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.error(err.stack);
    })
};

const addStore = (store) => {
  const values = Object.values(product);
  return pool
    .query('INSERT INTO products VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7', values)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error(err.stack);
    })
};

const updateStore = (sid, store) => {
  const columns = Object.keys(store);
  const values = Object.values(store);
  let query = 'UPDATE stores SET ';

  for (var i = 0; i < columns.length; i++) {
    query += `${columns[i]} = $${i + 2}`;
    if (i < columns.length - 1) {
      query += ', ';
    }
  }

  query += ' WHERE id = $1';

  const params = [sid, ...values];

  return pool
    .query(query, params)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error(err.stack);
    })
};

const deleteStore = (sid) => {
  return pool
    .query('DELETE FROM stores WHERE id = $1', [sid])
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error(err.stack);
    })
};

//Inventory
const getNearbyWithInventory = (pid, zip, callback) => {
  const zipMin = zip - 500;
  const zipMax = zip + 500;
  return pool
    .query('SELECT * FROM stores LEFT JOIN inventory ON stores.id = inventory.store_id WHERE zip BETWEEN $1 and $2 and product_id = $3',
      [zipMin, zipMax, pid])
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.error(err.stack);
    })
};


//CRUD Inventory
// const insertInventory = (inventory, callback) => {
//   database.query(
//     'insert into inventory set ?',
//     inventory,
//     (error) => {
//       callback(error);
//     },
//   );
// };

// const deleteInventoryByStore = (sid, callback) => {
//   database.query(
//     'delete * from inventory where store_id = ?',
//     sid,
//     (error) => {
//       callback(error);
//     },
//   );
// };

// const deleteInventoryByProduct = (pid, callback) => {
//   database.query(
//     'delete * from inventory where product_id = ?',
//     pid,
//     (error) => {
//       callback(error);
//     },
//   );
// };

// const getInventory = (pid, sid, callback) => {
//   database.query(
//     'select * from inventory where product_id = ? and store_id = ?',
//     [pid, sid],
//     (error) => {
//       callback(error);
//     },
//   );
// };

// const updateInventory = (inventory, callback) => {
//   database.query(
//     'update inventory set ? where id = ?',
//     [inventory, inventory.id],
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
  addProduct,
  updateProduct,
  deleteProduct,
  getStore,
  addStore,
  updateStore,
  deleteStore,
  getNearbyWithInventory
};
