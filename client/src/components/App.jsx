/*

arrow down - transform: rotate(90deg);
arrow up - transform: rotate(270deg);
<svg width="18px" height="28px" class="Chevron__ChevronIcon-sc-1q2x5f4-0 DOTSi StoreCheckerstyles__DropdownChevron-sc-1ogdbsf-1 hNeUFJ" viewBox="0 0 18 28" aria-hidden="true"><path d="M1.825 28L18 14 1.825 0 0 1.715 14.196 14 0 26.285z" fill="currentColor"></path></svg>

*/

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
    this.state = {
      pid: 1,
      product: {},
      quantityField: 1,
      stockExpansion: 0,
      sid: Math.floor(Math.random() * 20),
      store: {},
      storeInventory: 0,
    };
    this.inputQuantity = this.inputQuantity.bind(this);
    this.adjustQuantity = this.adjustQuantity.bind(this);
    this.updateWishlist = this.updateWishlist.bind(this);
    this.expander = this.expander.bind(this);
    this.changeStore = this.changeStore.bind(this);
  }

  componentDidMount() {
    const { pid, sid } = this.state;
    axios.get(`${pid}/product-details`)
      .then((response) => {
        axios.get(`${sid}/${pid}`)
          .then((res) => {
            console.log('store data:', res.data.store);
            this.setState({
              product: response.data[0],
              store: res.data.store,
              storeInventory: res.data.inventory,
            }, () => { console.log('componentDidMount success'); });
          })
          .catch((storeInvError) => {
            console.log('storeInvError:', storeInvError);
          });
      })
      .catch((err) => {
        console.log('get store error:', err);
      });
  }

  adjustQuantity(buttonText) {
    console.log('buttonText:', buttonText);
    const { quantityField } = this.state;
    let newQuantity = quantityField;
    console.log('previousQuantity:', newQuantity);

    if (buttonText === '+') {
      newQuantity += 1;
    } else if (buttonText === '-') {
      newQuantity -= 1;
    }

    this.setState({
      quantityField: newQuantity,
    }, () => {
      const { quantityField } = this.state;
      console.log('adjusted quantityField:', quantityField);
    });
  }

  inputQuantity(q) {
    this.setState({
      quantityField: q,
    }, () => {
      const { quantityField } = this.state;
      console.log('input quantityField:', quantityField);
    });
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
    let updatedStatus = 0;
    if (stockExpansion === 0) {
      updatedStatus = 1;
    }
    this.setState({
      stockExpansion: updatedStatus,
    }, () => { console.log('updated stockExpansion state:', updatedStatus); });
  }

  changeStore() {
    this.setState({
      stockExpansion: -1,
    }, () => { console.log('updated stockExpansion state: -1'); });
  }

  render() {
    const { product, quantityField, store, stockExpansion, storeInventory } = this.state;
    const stores = [store];
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
          store={store}
          stores={stores}
          inventory={storeInventory}
          status={stockExpansion}
          expander={this.expander}
          storeChanger={this.changeStore}
        />
        <Similar cat1={product.category_1} cat2={product.category_2} cat3={product.category_3} />
      </div>
    );
  }
}

export default App;
