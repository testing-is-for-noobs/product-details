// transition: 200ms ease-in-out;

import React from 'react';
import axios from 'axios';

import styles from '../css/styles.css';
import Tag from './Tag';
import Reviews from './Reviews';
import Availability from './Availability';
import AddToBag from './AddToBag';
import Wishlist from './Wishlist';
import Stock from './Stock';
import Similar from './Similar';

class App extends React.Component {
  constructor(props) {
    super(props);
    const inv = [];
    for (let i = 0; i < 20; i += 1) {
      inv.push({});
    }
    this.state = {
      pid: Math.floor(Math.random() * 100),
      product: {},
      quantityField: 1,
      stockExpansion: 'minimized',
      sid: Math.floor(Math.random() * 20),
      stores: [],
      nearbyStores: [],
      store: {},
      productInventory: inv,
      storeMenu: 'minimized',
    };
    this.inputQuantity = this.inputQuantity.bind(this);
    this.adjustQuantity = this.adjustQuantity.bind(this);
    this.updateWishlist = this.updateWishlist.bind(this);
    this.expander = this.expander.bind(this);
    this.changeStore = this.changeStore.bind(this);
    this.storeSearch = this.storeSearch.bind(this);
    this.searchButton = this.searchButton.bind(this);
    this.toggleDrop = this.toggleDrop.bind(this);
    this.selectStore = this.selectStore.bind(this);
  }

  componentDidMount() {
    const { pid, sid } = this.state;
    console.log('CDM pid:', pid);
    console.log('CDM sid:', sid);
    axios.get(`${pid}/product-details`)
      .then((response) => {
        const nearby = [];
        const storesCopy = response.data.stores.slice();
        storesCopy.splice(sid - 1, 1);
        const random = Math.floor(Math.random() * 4) + 2;
        for (let i = 0; i < random; i += 1) {
          const removed = storesCopy.splice(Math.floor(Math.random() * storesCopy.length), 1);
          nearby.push(removed[0]);
        }
        this.setState({
          product: response.data.product[0],
          stores: response.data.stores,
          nearbyStores: nearby,
          store: response.data.stores[sid],
          productInventory: response.data.inventory,
        }, () => { console.log('component mounted'); });
      })
      .catch((error) => {
        console.log('Get Error:', error);
      });
  }

  adjustQuantity(buttonText) {
    const { quantityField } = this.state;
    let newQuantity = quantityField;

    if (buttonText === '+') {
      newQuantity += 1;
    } else if (buttonText === '-') {
      newQuantity -= 1;
    }

    this.setState({
      quantityField: newQuantity,
    }, () => { console.log('quantityField adjusted:', newQuantity); });
  }

  inputQuantity(userInput) {
    const { product, quantityField } = this.state;
    let newQuantity = Number(userInput);
    if (isNaN(newQuantity)) {
      newQuantity = quantityField;
    } else if (newQuantity > product.customer_limit) {
      newQuantity = product.customer_limit;
    } else if (newQuantity < 1) {
      newQuantity = 1;
    }
    this.setState({
      quantityField: newQuantity,
    }, () => { console.log('quantityField updated:', newQuantity); });
  }

  updateWishlist() {
    const { pid } = this.state;
    axios.put(`/${pid}/product-details/wishlist`)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      })
      .catch((error) => {
        console.log('update wishlist error:', error);
      });
  }

  expander() {
    const { stockExpansion } = this.state;
    let updatedStatus = 'minimized';
    if (stockExpansion === 'minimized') {
      updatedStatus = 'expanded';
    }
    this.setState({
      stockExpansion: updatedStatus,
      storeMenu: 'minimized',
    }, () => { console.log('updated stockExpansion state:', updatedStatus); });
  }

  changeStore() {
    this.setState({
      stockExpansion: 'change store',
    }, () => { console.log('updated stockExpansion state: change store'); });
  }

  storeSearch() {
    //
  }

  searchButton() {
    //
  }

  toggleDrop() {
    const { storeMenu } = this.state;
    let updatedStatus = 'minimized';
    if (storeMenu === 'minimized') {
      updatedStatus = 'expanded';
    }
    this.setState({
      storeMenu: updatedStatus,
    }, () => { console.log('updated storeMenu state:', updatedStatus); });
  }

  selectStore() {
    //
  }

  render() {
    const { product, quantityField, stores, nearbyStores, store, stockExpansion, storeMenu, productInventory, sid } = this.state;
    console.log('productInventory[sid - 1]:', productInventory[sid - 1]);
    return (
      <div className={styles.container}>
        <Tag tag={product.tag} />
        <p className={styles.productLine}>
          {product.product_line}
        </p>
        <h1 className={styles.productTitle}>
          {product.name}
        </h1>
        <Reviews rating={product.rating} count={product.review_count} />
        <h1 className={styles.price}>
          {`$${product.price}`}
        </h1>
        <Availability onlineInv={product.online_inventory} />
        <AddToBag
          limit={product.customer_limit}
          quantity={quantityField}
          changeHandler={this.inputQuantity}
          buttonHandler={this.adjustQuantity}
        />
        <Wishlist liked={product.liked} updater={this.updateWishlist} />
        <Stock
          status={stockExpansion}
          expander={this.expander}
          storeChanger={this.changeStore}
          toggleDrop={this.toggleDrop}
          storeMenu={storeMenu}
          stores={stores}
          nearbyStores={nearbyStores}
          store={store}
          sid={sid}
          inventory={productInventory[sid - 1].inventory}
        />
        <Similar cat1={product.category_1} cat2={product.category_2} cat3={product.category_3} />
      </div>
    );
  }
}

export default App;
