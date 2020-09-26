const express = require('express');
const server = express();

server.use(express.static(__dirname + '/../client/dist'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const db = require('./database');

server.get('/:pid/product-details', (req, res) => {
  db.getProduct(req.params.pid, (error, product) => {
    if (error) {
      console.log(error);
      res.status(404);
    } else {
      console.log(product);
      res.status(200).send(product);
    }
  });
});

server.get('/:pid/product-details/inventory', (req, res) => {
  db.getProduct(req.params.pid, (error, product) => {
    if (error) {
      console.log(error);
      res.status(404).send('getProduct error');
    } else {
      console.log(product);
      db.getStore(req.body.zip, (err, store) => {
        if (err) {
          console.log(err);
          res.status(404).send('getStore error');
        } else {
          db.getInventory(product[0].id, store[0].id, (inverror, inventory) => {
            if (inverror) {
              console.log(inverror);
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
    }
  });
});

server.put('/:pid/product-details/wishlist', (req, res) => {
  db.getProduct(req.params.pid, (error, product) => {
    if (error) {
      console.log(error);
      res.status(404);
    } else {
      console.log(product);
      let updatedStatus = 0;
      if (product.liked === 0) {
        updatedStatus = 1;
      }
      db.updateWishlist(updatedStatus, req.params.pid, (putError, result) => {
        if (error) {
          console.log(putError);
          res.status(404);
        } else {
          console.log(result);
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
