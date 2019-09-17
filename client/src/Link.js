import React, {Component} from 'react';
import PlaidLink from 'react-plaid-link';

class Link extends Component {
  constructor (props) {
    super(props);
    this.products = ['auth', 'transactions', 'identity'];
  }

  sendToken (public_token) {
    var request = new XMLHttpRequest()
    request.open('POST', '/get_access_token')

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        this.props.unmountSelf();
      }
    }

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.send('public_token=' + encodeURIComponent(public_token))
  }

  render () {
    return (
      <>
        <PlaidLink
          publicKey={this.props.public_key}
          product={this.products}
          env='sandbox'
          clientName='Fin Dash'
          onSuccess={this.sendToken.bind(this)}
        />
      </>
    )
  }
}

export default Link;
