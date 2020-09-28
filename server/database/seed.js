const db = require('./index.js');
const faker = require('faker');

for (let i = 1; i <= 100; i += 1) {
  const fakeProduct = {
    id: i,
    name: `LEGO® ${faker.commerce.productName()}`,
    product_line: faker.commerce.productMaterial(),
    tag: faker.random.number({ min: 0, max: 3 }),
    price: faker.random.number({ min: 0, max: 12000, precision: 0.01 }),
    rating: Math.random() * 5,
    online_inventory: faker.random.number({ min: 0, max: 1 }),
    review_count: faker.random.number({ min: 0, max: 12000 }),
    customer_limit: faker.random.number({ min: 1, max: 20 }),
    liked: faker.random.number({ min: 0, max: 1 }),
    category_1: faker.commerce.productMaterial(),
    category_2: faker.commerce.productMaterial(),
    category_3: faker.commerce.productMaterial(),
  };
  db.insertProduct(fakeProduct, (error) => {
    if (error) {
      console.log(`product insertion error @ ${i}: ${error}`);
    } else {
      console.log(`successful product insertion #${i}`);
    }
  });
}

const urlprefix = 'https://fec-lego.s3-us-west-1.amazonaws.com/Store+Details/store+';
const images = [
  `${urlprefix}1.png`,
  `${urlprefix}2.png`,
  `${urlprefix}3.png`,
  `${urlprefix}4.png`,
  `${urlprefix}5.png`,
  `${urlprefix}6.png`,
  `${urlprefix}7.png`,
  `${urlprefix}8.png`,
  `${urlprefix}9.png`,
  `${urlprefix}10.png`,
  `${urlprefix}11.png`,
  `${urlprefix}12.png`,
  `${urlprefix}13.png`,
  `${urlprefix}14.png`,
  `${urlprefix}15.png`,
  `${urlprefix}16.png`,
  `${urlprefix}17.png`,
  `${urlprefix}18.png`,
  `${urlprefix}19.png`,
  `${urlprefix}20.png`,
];

for (let i = 1; i <= 20; i += 1) {
  const fakeStore = {
    id: i,
    name: `LEGO® Store - ${faker.company.companyName()}`,
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode('#####'),
    phone: faker.phone.phoneNumber(),
    details: images[i - 1],
  };
  db.insertStore(fakeStore, (error) => {
    if (error) {
      console.log(`store insertion error @ ${i}: ${error}`);
    } else {
      console.log(`successful store insertion #${i}`);
    }
  });
}

db.getAllProducts((error, products) => {
  if (error) {
    console.log('getAllProducts error:', error);
  } else {
    db.getAllStores((err, stores) => {
      if (err) {
        console.log('getAllStores error:', err);
      } else {
        let count = 0;
        for (let i = 0; i < products.length; i += 1) {
          const currentProduct = products[i];
          for (let j = 0; j < stores.length; j += 1) {
            const currentStore = stores[j];
            count += 1;
            const inventory = {
              id: count,
              inventory: faker.random.number({ min: 0, max: 20 }),
              product_id: currentProduct.id,
              store_id: currentStore.id,
            };
            db.insertInventory(inventory, (inverror) => {
              if (inverror) {
                console.log(`inventory insertion error: ${inverror}`);
              }
            });
          }
        }
      }
    });
  }
});
