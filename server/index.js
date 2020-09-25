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

server.get('/:pid/product-details/inventory');

server.put('/:pid/product-details/wishlist');

const PORT = 8080;
