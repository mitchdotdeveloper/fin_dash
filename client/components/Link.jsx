import React from 'react';
import PlaidLink from './PlaidLink';
import './styles/link.css';

class Link extends React.Component {
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
      <PlaidLink
        className='link-btn'
        public_key={this.props.public_key}
        product={this.products}
        env='sandbox'
        clientName='Fin Dash'
        onSuccess={this.sendToken.bind(this)}
        onExit={this.handleExit.bind(this)}>
      </PlaidLink>
    );
  }
}

export default Link;
