const faker = require('faker/locale/en_US');
const fs = require('fs');
const productCount = 1000;
const storeCount = 500;
const itemsPerStore = 500;
// const db = require('./index.js');

const productStream = fs.createWriteStream('products.csv');
productStream.write('id, name, product_line, tag, price, online_inventory, rating, review_count, customer_limit, liked, category_1, category_2, category_3\n', 'utf8');

function writeProducts(stream, encoding, callback) {

  let i = 0;

  function write() {
    let hasMem = true;

    while(i < productCount && hasMem){
      i++;
      const pline = `${faker.commerce.productMaterial()}™`;
      const id = i,
        name = `LEGO® ${faker.commerce.productName()}`,
        product_line = pline,
        tag = faker.random.arrayElement(['New', 'Exclusives', 'Hard to find', '']),
        price = `${faker.random.number({ min: 10, max: 499 })}.99`,
        online_inventory = faker.random.number({ min: 0, max: 1 }),
        rating = Math.random() * 5,
        review_count = faker.random.number({ min: 0, max: 1000 }),
        customer_limit = faker.random.number({ min: 5, max: 12 }),
        liked = faker.random.number({ min: 0, max: 1 }),
        category_1 = pline,
        category_2 = faker.commerce.productAdjective(),
        category_3 = `${faker.commerce.department()}®`;

      const data = `${id},${name},${product_line},${tag},${price},${online_inventory},${rating},${review_count},${customer_limit},${liked},${category_1},${category_2},${category_3}\n`;

      if(i === productCount) {
        stream.write(data, encoding, callback);
      } else {
        hasMem = stream.write(data, encoding);
      }
    }
    if(i < productCount){
      stream.once('drain', write);
    }
  }
  write();
}

writeProducts(productStream, 'utf-8', () => (productStream.end()));



const images = [];
for (let i = 1; i <= 20; i += 1) {
  images.push(`https://fec-lego.s3-us-west-1.amazonaws.com/Store+Details/store+${i}.png`);
}

const storeStream = fs.createWriteStream('stores.csv');
storeStream.write('id, name, address, city, state, zip, phone, details\n', 'utf8');

function writeStores(stream, encoding, callback) {

  let i = 0;

  function writeStore() {
    let hasMem = true;

    while (i < storeCount && hasMem) {
      i++;

      const  id = i,
        name = `LEGO® Store ${faker.address.streetName()}`,
        address = faker.address.streetAddress(),
        city = faker.address.city(),
        state = faker.address.stateAbbr();
        zip = faker.address.zipCodeByState(state),
        phone = faker.phone.phoneNumberFormat(),
        details = faker.random.arrayElement(images);

      const data = `${id},${name},${address},${city},${state},${zip},${phone},${details}\n`;

      if(i === storeCount) {
        stream.write(data, encoding, callback);
      } else {
        hasMem = stream.write(data, encoding);
      }
    }
    if(i < storeCount) {
      stream.once('drain', writeStore);
    }
  }
  writeStore();
}

writeStores(storeStream, 'utf-8', () => (storeStream.end()));



const invStream = fs.createWriteStream('inventory.csv');
invStream.write('id, store_id, product_id, inventory\n', 'utf8');

function writeInventory(stream, encoding, callback) {

  let id = 0;
  let store_id = 0;

  function writeInv() {
    let hasMem = true;

    while(store_id < storeCount && hasMem) {
      store_id++;

      for (var j = 0; j < itemsPerStore; j++){
        id++;
        const product_id = faker.random.number({min: 1, max: productCount});
        const inv = faker.random.number({min: 1, max: 500});
        const data = `${id},${store_id},${product_id},${inv}\n`;

        if(store_id === storeCount) {
          stream.write(data, encoding, callback);
        } else {
          hasMem = stream.write(data, encoding);
        }
      }
    }
    if(store_id < storeCount) {
      stream.once('drain', writeInv);
    }
  }
  writeInv();
}

writeInventory(invStream, 'utf-8', () => (invStream.end()));