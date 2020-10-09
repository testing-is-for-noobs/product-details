const express = require('express');
const db = require('./database');

const server = express();
server.use(express.static(`${__dirname}/../client/dist`));

server.get('/:pid/product-details/', (req, res) => {
  db.initialData(req.params.pid)
    .then(([product, stores, inventory]) => {
      const data = { product, stores, inventory };
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(404).send(error);
      console.log('initialData error:', error);
    });
});

server.put('/:pid/product-details/wishlist', (req, res) => {
  db.getProduct(req.params.pid, (error, product) => {
    if (error) {
      res.status(404);
      throw new Error('put getProduct error:', error);
    } else {
      let updatedStatus = 0;
      if (product[0].liked === 0) {
        updatedStatus = 1;
      }
      db.updateWishlist(updatedStatus, req.params.pid, (putError) => {
        if (putError) {
          res.status(404);
          console.log('putError:', putError);
        } else {
          res.status(200).send('wishlist status updated');
        }
      });
    }
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}`);
});
