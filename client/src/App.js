import React, { Component } from 'react';
import PlaidLink from 'react-plaid-link';

class App extends Component {
  constructor (props) {
    super(props);
    this.products = ['auth', 'transactions', 'identity'];
  }

  componentDidMount() {
    var root = document.getElementById('root');
    var linkBtn = root.firstChild.firstChild;
    linkBtn.classList.add('link-btn');
    linkBtn.id = 'link-btn';
    linkBtn.removeAttribute('style');
    linkBtn.innerHTML = 'Link to your bank';

    root.removeChild(root.firstChild);
    root.append(linkBtn);
  }

  sendToken (public_token) {
    var httpRequest = new XMLHttpRequest()
    httpRequest.open('POST', '/get_access_token')
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    httpRequest.send('public_token=' + encodeURIComponent(public_token))
  }

  render () {
    return (
      <React.Fragment>
        <PlaidLink
          publicKey={this.props.public_key}
          product={this.products}
          env="sandbox"
          clientName="Fin Dash"
          onSuccess={this.sendToken.bind(this)}
        />
      </React.Fragment>
    );
  }
}

export default App;
