const faker = require('faker/locale/en_US');
const fs = require('fs');
const csv = require('fast-csv');


//write products
const productFile = fs.createWriteStream('products.csv');
const productStream = csv.format({headers: true});

productStream.pipe(productFile).on('end', () => process.exit());

const productCount = 10000000;
let i = 1;

function writeProduct() {
  let hasMem = true;

  while(i < productCount){

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

    // productStream.write(fakeProduct);
    i++;

    if(i === productCount) {
      // productStream.write(fakeProduct);
      productStream.end();
    } else {
      hasMem = productStream.write(fakeProduct);
    }
  }
  if(i < productCount){
    productFile.once('drain', writeProduct);
  }
}

writeProduct();






//write stores
const storeFile = fs.createWriteStream('stores.csv');
const storeStream = csv.format({headers: true});

storeStream.pipe(storeFile).on('end', () => process.exit());

const images = [];
for (let i = 1; i <= 20; i += 1) {
  images.push(`https://fec-lego.s3-us-west-1.amazonaws.com/Store+Details/store+${i}.png`);
}

const storeCount = 10000;
let j = 1;

while(j < storeCount) {
  const state = faker.address.stateAbbr();
  const fakeStore = {
    id: j,
    name: `LEGO® Store ${faker.address.streetName()}`,
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: state,
    zip: faker.address.zipCodeByState(state),
    phone: faker.phone.phoneNumber(),
    details: 'https://fec-lego.s3-us-west-1.amazonaws.com/Store+Details/store+${1}.png',
  };
  storeStream.write(fakeStore);
  j++;
}
storeStream.end();
