const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const server = express();
server.use(express.static(__dirname + '/../client/dist'));
server.use(bodyParser.json());

server.get('/:pid/product-details/', (req, res) => {
  db.initialData(req.params.pid)
    .then(([product, stores, inventory]) => {
      const data = { product, stores, inventory };
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log('initialData error:', error);
      res.status(404).send(error);
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
