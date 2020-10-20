const faker = require('faker/locale/en_US');
const db = require('./index.js');

for (let i = 1; i <= 100; i += 1) {
  const pline = `${faker.commerce.productMaterial()}™`;
  const fakeProduct = {
    id: i,
    name: `LEGO® ${faker.commerce.productName()}`,
    product_line: pline,
    tag: faker.random.arrayElement(['New', 'Exclusives', 'Hard to find', '']),
    price: `${faker.random.number({ min: 10, max: 499 })}.99`,
    online_inventory: faker.random.number({ min: 0, max: 1 }),
    rating: Math.random() * 5,
    review_count: faker.random.number({ min: 0, max: 1000 }),
    customer_limit: faker.random.number({ min: 5, max: 12 }),
    liked: faker.random.number({ min: 0, max: 1 }),
    category_1: pline,
    category_2: faker.commerce.productAdjective(),
    category_3: `${faker.commerce.department()}®`,
  };
  db.insertProduct(fakeProduct, (error) => {
    if (error) {
      throw new Error(`product insertion error @ ${i}: ${error}`);
    } else {
      // eslint-disable-next-line no-console
      console.log(`successful product insertion #${i}`);
    }
  });
}

const images = [];
for (let i = 1; i <= 20; i += 1) {
  images.push(`https://fec-lego.s3-us-west-1.amazonaws.com/Store+Details/store+${i}.png`);
}

for (let i = 1; i <= 20; i += 1) {
  const state = faker.address.stateAbbr();
  const fakeStore = {
    id: i,
    name: `LEGO® Store ${faker.address.streetName()}`,
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: state,
    zip: faker.address.zipCodeByState(state),
    phone: faker.phone.phoneNumber(),
    details: images[i - 1],
  };
  db.insertStore(fakeStore, (error) => {
    if (error) {
      throw new Error(`store insertion error @ ${i}: ${error}`);
    } else {
      // eslint-disable-next-line no-console
      console.log(`successful store insertion #${i}`);
    }
  });
}

db.seedData()
  .then(([products, stores]) => {
    let count = 0;
    for (let i = 0; i < products.length; i += 1) {
      const currentProduct = products[i];
      for (let j = 0; j < stores.length; j += 1) {
        const currentStore = stores[j];
        count += 1;
        let inv;
        const random = Math.floor(Math.random() * 2);
        if (random === 0) {
          inv = 0;
        } else if (random === 1) {
          inv = faker.random.number({ min: 1, max: 20 });
        }
        const inventory = {
          id: count,
          inventory: inv,
          product_id: currentProduct.id,
          store_id: currentStore.id,
        };
        db.insertInventory(inventory, (inverror) => {
          if (inverror) {
            throw new Error(`inventory insertion error: ${inverror}`);
          }
        });
      }
    }
  })
  .then(() => { db.connection.end(); })
  .catch((error) => { throw new Error('seedData error:', error); });
