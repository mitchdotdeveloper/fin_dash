import React from 'react';
import Link from './newLink';
import Dash from './Dash';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkSucceeded: false,
      item: null
    }
  }

  updateItem(item) {
    this.setState({ item : item });
  }

  linkSuccess() {

  }

  unmountLink() {
    var root = document.getElementById('root');
    while (root.nextSibling) {
      root.nextSibling.remove();
    }
    this.setState({ linkSucceeded: true });
  }

  render() {
    return this.state.linkSucceeded && this.state.item
      ?  <Dash available_products={this.state.item.available_products} />
      :  <Link
            public_key={this.props.public_key}
            products={['auth', 'transactions']}
            success={this.linkSuccess.bind(this)}/>
  }
}
export default App;
