const db = require('./index.js');
const faker = require('faker');

for (let i = 0; i < 100; i += 1) {
  const fakeProduct = {
    name: `LEGO® ${faker.commerce.productName()}`,
    line: faker.commerce.productMaterial(),
    price: faker.commerce.price(),
    climit: faker.random.number({ min: 1, max: 10 }),
    liked: faker.random.number({ min: 0, max: 1 }),
    cat1: faker.commerce.productMaterial(),
    cat2: faker.commerce.productMaterial(),
    cat3: faker.commerce.productMaterial(),
  };
  db.insertProduct(fakeProduct, (error) => {
    if (error) {
      console.log(`product insertion error @ ${i}: ${error}`);
    } else {
      console.log(`successful product insertion #${i}`);
    }
  });
}

for (let i = 0; i < 20; i += 1) {
  const fakeStore = {
    name: `LEGO® Store - ${faker.company.companyName()}`,
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode(),
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
