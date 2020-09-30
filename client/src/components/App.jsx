import React from 'react';
import axios from 'axios';

import styles from '../css/styles.css';
import Tag from './Tag.jsx';
import Availability from './Availability.jsx';
import AddToBag from './AddToBag.jsx';
import Reviews from './Reviews.jsx';

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
    const { quantityField } = this.state;
    this.setState({
      quantityField: q,
    }, () => { console.log(quantityField); });
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
      </div>
    );
  }
}

export default App;
