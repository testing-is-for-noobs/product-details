import React from 'react';
import axios from 'axios';

import Tag from './components/tag.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: 1,
      product: {
        tag: 0,
      },
    };
  }

  componentDidMount() {
    axios.get(`${this.state.pid}/product-details`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          product: response.data[0],
        }, () => { console.log(`state.products updated`); });
      })
      .catch((error) => {
        console.log('get error:', error);
      });
  }

  render() {
    return (
      <div>
        <Tag tag={this.state.product.tag} />
        <p id="product-line">PRODUCT LINE</p>
        <h1 id="product-title">Product #{this.state.pid} Details</h1>
        <div id="tag2">text2</div>
      </div>
    );
  }
}

export default App;
