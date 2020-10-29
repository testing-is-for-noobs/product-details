require('newrelic');
const express = require('express');
const db = require('./database');
const bodyParser = require('body-parser');


const server = express();
server.use(express.static(`${__dirname}/../client/dist`));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));


server.get('/loaderio-6dc356704755fd041e75b36dacf8f3d9/', (req, res) => {
  res.send('loaderio-6dc356704755fd041e75b36dacf8f3d9');
});

//CRUD for products
server.get('/product/:pid', (req, res) => {

  db.getProduct(req.params.pid)
  .then((product) => {
    if (!product) {
      res.status(400).send(`error finding product with id: ${req.params.pid}`);
    }

    res.status(200).send(product);
  });
});

server.post('/product', (req, res) => {
  db.addProduct(req.body)
  .then((response) => {
    if (!response) {
      res.status(400).send(`error adding product`);
    }
    res.status(200).send('product successfully added');
  });
});

server.put('/product/:pid', (req, res) => {
  db.updateProduct(req.params.pid, req.body)
  .then((reponse) => {
    if (!reponse) {
      res.status(400).send(`error updating product with id: ${req.params.pid}`);
    }

    res.status(200).send(`product with id: ${req.params.pid} updated`);
  });
});

server.delete('/product/:pid', (req, res) => {
  db.deleteProduct(req.params.pid)
  .then((response) => {
    if (!response) {
      res.status(400).send(`error deleting product with id: ${req.params.pid}`);
    }

    res.status(200).send(`product with id ${req.params.id} has been deleted`);
  });
});

//CRUD for stores
server.get('/store/:sid', (req, res) => {
  db.getStore(req.params.sid)
  .then((store) => {
    if (!store) {
      res.status(400).send(`error finding store with id: ${req.params.sid}`);
    }
    res.status(200).send(store);
  });
});

server.post('/store', (req, res) => {
  db.addStore(req.body)
  .then((response) => {
    if (!response) {
      res.status(400).send(`error adding new store`);
    }
    res.status(200).send('new store successfully added');
  });
});

server.put('/store/:sid', (req, res) => {
  db.updateStore(req.params.sid, req.body)
  .then((response) => {
    if (!response) {
      res.status(400).send(`error updating store with id: ${req.params.sid}`);
    }
    res.status(200).send(`store with id: ${req.params.sid} has been updated`);
  });
});

server.delete('/store/:sid', (req, res) => {
  db.deleteStore(req.params.sid)
  .then((response) => {
    if (!response) {
      res.status(400).send(`error deleting store with id: ${req.params.sid}`);
    }
    res.status(200).send(`store with id: ${req.params.sid} succesfully deleted`);
  });
});

//CRUD for inventory
server.get('/nearbyWithInventory/:pid/:zip', (req, res) => {
  const { pid, zip } = req.params;
  // console.log(`get request for nearby stores at ${zip} with product ${pid}`);
  db.getNearbyWithInventory(pid, zip)
  .then((inventory) => {
    if (!inventory) {
      res.status(400).send(`error finding inventory with pid: ${pid} and zip: ${zip}`);
    }
    res.status(200).send(inventory);
  })
  .catch(err => {
    console.error(err.stack);
  });

});


const PORT = 8888;
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}`);
});
