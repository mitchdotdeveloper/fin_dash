import React, { Component } from 'react';
import PlaidLink from 'react-plaid-link';
import './styles/link.css';

class Link extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkIsOpen: true
    }
    this.products = ['auth', 'transactions'];
  }

  sendToken(public_token, metadata) {
    fetch('/get_access_token', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({public_token:public_token})
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: Returned with ${res.status}`))
    .then(data => data.err ? Promise.reject(`Error: ${data.error_message}`) : this.getItems())
    .catch(err => console.error(err));
  }

  getItems() {
    fetch('/item/get', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: Returned with ${res.status}`))
    .then(data => {
      if ( data.err ) {
        Promise.reject(`Error ${data.error_message}`);
      } else {
        this.props.update_item(data);
        this.props.unmountSelf();
      }
    })
    .catch(err => console.log(err));
  }

  handleExit(err, metadata) {
    if (err != null) {
      console.error(err.displayMessage);
    } else {
      this.setState({ linkIsOpen: false });
    }
  }

  render() {
    return (
      <div className='linkContent'>
        <h1 className="linkContent__header">Link your account</h1>
        <PlaidLink
          className="link-btn"
          publicKey={this.props.public_key}
          product={this.products}
          env='sandbox'
          clientName='Fin Dash'
          onSuccess={this.sendToken.bind(this)}
          onExit={this.handleExit.bind(this)}>
          Link
        </PlaidLink>
      </div>
    )
  }
}

export default Link;
