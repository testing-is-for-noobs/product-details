const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const server = express();
server.use(express.static(__dirname + '/../client/dist'));
server.use(bodyParser.json());

server.get('/:pid/product-details', (req, res) => {
  db.getProduct(req.params.pid, (error, product) => {
    if (error) {
      console.log('getProduct error:', error);
      res.status(404);
    } else {
      console.log('getProduct:', product);
      res.status(200).send(product);
    }
  });
});

server.get('/:sid/:pid', (req, res) => {
  db.getAllStores((error, stores) => {
    if (error) {
      console.log('getProduct error:', error);
      res.status(404);
    } else {
      db.getInventory(req.params.pid, req.params.sid, (inverror, inventory) => {
        if (inverror) {
          console.log(inverror);
        } else {
          const response = {
            store: stores[req.params.sid],
            inventory,
          };
          console.log('getInitialStoreInv:', response);
          res.status(200).send(response);
        }
      });
    }
  });
});

server.get('/:pid/product-details/inventory', (req, res) => {
  db.getStore(req.body.zip, (err, store) => {
    if (err) {
      console.log('getInventory getStore error:', err);
      res.status(404).send('getStore error');
    } else {
      console.log('getInventory getStore:', store);
      db.getInventory(req.params.pid, store[0].id, (inverror, inventory) => {
        if (inverror) {
          console.log('getInventory:', inverror);
          res.status(404).send('getInventory error');
        } else {
          const response = [
            store[0],
            inventory[0],
          ];
          res.status(200).send(response);
        }
      });
    }
  });
});

server.put('/:pid/product-details/wishlist', (req, res) => {
  db.getProduct(req.params.pid, (error, product) => {
    if (error) {
      console.log('put getProduct error:', error);
      res.status(404);
    } else {
      console.log('put getProduct:', product);
      let updatedStatus = 0;
      if (product[0].liked === 0) {
        updatedStatus = 1;
      }
      console.log('updatedStatus:', updatedStatus);
      db.updateWishlist(updatedStatus, req.params.pid, (putError, result) => {
        if (putError) {
          console.log('putError:', putError);
          res.status(404);
        } else {
          console.log('put result:', result);
          res.status(200).send('wishlist status updated');
        }
      });
    }
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
