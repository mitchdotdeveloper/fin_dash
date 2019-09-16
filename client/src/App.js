import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Link from './Link';
import Dash from './Dash';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      linkSucceeded: false
    }
  }

  unmountLink () {
    var root = document.getElementById('root');
    while (root.nextSibling) {
      root.nextSibling.remove();
    }
    this.setState({ linkSucceeded: true });
  }

  render () {
    if (this.state.linkSucceeded) {
      console.log('state dash');
      return (
        <>
          <Dash />
        </>
      )
    } else {
      console.log('state link');
      return (
        <>
          <Link public_key={this.props.public_key} unmountSelf={this.unmountLink.bind(this)} />
        </>
      );
    }
  }
}

export default App;
