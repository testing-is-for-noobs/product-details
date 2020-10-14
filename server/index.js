const express = require('express');
const db = require('./database');

const server = express();
server.use(express.static(`${__dirname}/../client/dist`));

//CRUD for products
server.get('/product/:pid', (req, res) => {
  // db.initialData(req.params.pid)
  //   .then(([product, stores, inventory]) => {
  //     const data = { product, stores, inventory };
  //     res.status(200).send(data);
  //   })
  //   .catch((error) => {
  //     res.status(404).send(error);
  //     console.log('initialData error:', error);
  //   });
  const id = req.params.pid;
  console.log(`get request for product ${id}`);
});

server.post('/product', (req, res) => {
  const id = req.params.pid;
  console.log(`post request for product ${id}`);
});

server.put('/product/:pid', (req, res) => {
  const id = req.params.pid;
  console.log(`put request for product ${id}`);
});

server.delete('/product/:pid', (req, res) => {
  const id = req.params.pid;
  console.log(`delete request for product ${id}`);
});

//CRUD for stores
server.get('/store/:sid', (req, res) => {
  const id = req.params.sid;
  console.log(`get request for store ${id}`);
});

server.post('/store', (req, res) => {
  const id = req.params.sid;
  console.log(`post request for store ${id}`);
});

server.put('/store/:sid', (req, res) => {
  const id = req.params.sid;
  console.log(`put request for store ${id}`);
});

server.delete('/store/:sid', (req, res) => {
  const id = req.params.sid;
  console.log(`delete request for store ${id}`);
});

//Get nearby stores
server.get('/nearbyStores/:zip', (req, res) => {
  const zip = req.params.zip;
  console.log(`get request for nearby stores ${zip}`);
});

//Get nearby stores that have inventory
server.get('/nearbyWithInventory/:pid/:zip', (req, res) => {
  const { pid, zip } = req.params;
  console.log(`get request for nearby stores at ${zip} with product ${pid}`);

});

const PORT = 8888;
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}`);
});
