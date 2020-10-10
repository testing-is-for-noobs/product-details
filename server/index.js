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

const PORT = 8888;
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}`);
});
