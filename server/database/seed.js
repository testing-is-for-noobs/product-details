const db = require('./index.js');
const faker = require('faker');

for (let i = 1; i <= 100; i += 1) {
  const fakeProduct = {
    id: i,
    name: `LEGO® ${faker.commerce.productName()}`,
    product_line: faker.commerce.productMaterial(),
    price: faker.commerce.price(),
    rating: Math.random() * 5,
    review_count:faker.random.number({ min: 0, max: 12000 }),
    customer_limit: faker.random.number({ min: 1, max: 10 }),
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

for (let i = 1; i <= 20; i += 1) {
  const fakeStore = {
    id: i,
    name: `LEGO® Store - ${faker.company.companyName()}`,
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode('xxxxx'),
    phone: faker.phone.phoneNumber(),
    details: faker.image.imageUrl(),
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
          let currentProduct = products[i];
          for (let j = 0; j < stores.length; j += 1) {
            let currentStore = stores[j];
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
              } else {
                console.log(`successful inventory insertion for Product #${currentProduct.id}, Store #${currentStore.id}`);
              }
            });
          }
        }
      }
    });
  }
});
