import React, { Component } from 'react';
import Link from './Link';
import Dash from './Dash';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      linkSucceeded: false
    }
    this.item = null;
  }

  updateItem (item) {
    // this.setState( {item: JSON.parse(item).item} );
    this.item = JSON.parse(item).item;
  }

  unmountLink () {
    var root = document.getElementById('root');
    while (root.nextSibling) {
      root.nextSibling.remove();
    }
    this.setState({ linkSucceeded: true });
  }

  render () {
    if (this.state.linkSucceeded && this.item) {
      return (
        <>
          <Dash available_products={this.item.available_products}/>
        </>
      );
    } else {
      return (
        <>
          <Link public_key={this.props.public_key} unmountSelf={this.unmountLink.bind(this)} update_item={this.updateItem.bind(this)} />
        </>
      );
    }
  }
}

export default App;
