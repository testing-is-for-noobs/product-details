import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: 1,
    };
  }

  componentDidMount() {
    axios.get(`${this.state.pid}/product-details`)
      .then((product) => {
        console.log(product);
      })
      .catch((error) => {
        console.log('get error:', error);
      });
  }

  render() {
    return (
      <h1>
        Product #
        {this.state.pid}
        Details
      </h1>
    );
  }
}

export default App;
