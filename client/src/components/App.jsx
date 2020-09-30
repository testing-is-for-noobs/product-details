import React from 'react';
import axios from 'axios';

import styles from '../css/styles.css';
import Tag from './Tag.jsx';
import Reviews from './Reviews.jsx';
import Availability from './Availability.jsx';
import AddToBag from './AddToBag.jsx';
import Wishlist from './Wishlist.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: 1,
      product: {},
      quantityField: 1,
    };
    this.inputQuantity = this.inputQuantity.bind(this);
  }

  componentDidMount() {
    const { pid } = this.state;
    axios.get(`${pid}/product-details`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          product: response.data[0],
        }, () => { console.log('state.products updated'); });
      })
      .catch((error) => {
        console.log('get error:', error);
      });
  }

  inputQuantity(q) {
    this.setState({
      quantityField: q,
    }, () => {
      const { quantityField } = this.state;
      console.log(quantityField);
    });
  }

  render() {
    const { product, quantityField } = this.state;
    return (
      <div className={styles.container}>
        <Tag tag={product.tag} />
        <p className={styles.productLine}>{product.product_line}</p>
        <h1 className={styles.productTitle}>{product.name}</h1>
        <Reviews rating={product.rating} count={product.review_count} />
        <h1 className={styles.price}>{`$${product.price}`}</h1>
        <Availability onlineInv={product.online_inventory} />
        <AddToBag
          limit={product.customer_limit}
          quantity={quantityField}
          changeHandler={this.inputQuantity}
        />
        <Wishlist liked={product.liked} />
      </div>
    );
  }
}

export default App;
