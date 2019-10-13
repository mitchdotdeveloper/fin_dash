import React from 'react';
import './styles/link.css';

export default class Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handler: this.initializePlaidLink()
    };
  }

  linkSuccess(public_token, metadata) {
    this.sendToken(public_token, metadata)
      .then(res => this.getItems())
      .then(item => this.props.success(item))
      .catch(err => err);
  }

  linkExit(error, metadata) {
    if (error) {
      console.error(error.display_message);
      this.props.exit(null);
    }
  }

  initializePlaidLink() {
    return Plaid.create({
      clientName: 'Fin Dash',
      env: 'sandbox',
      key: this.props.public_key,
      product: this.props.products,
      onSuccess: this.linkSuccess.bind(this),
      onExit: this.linkExit.bind(this)
    });
  }

  sendToken(public_token, metadata) {
    return fetch('/get_access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token: public_token })
    })
      .then(res => res.ok ? res.json() : Promise.reject(new Error(`Returned with ${res.status}`)))
      .then(data => data.error ? Promise.reject(new Error(data.error_message)) : data)
      .catch(err => console.error(err));
  }

  getItems() {
    return fetch('/item/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.ok ? res.json() : Promise.reject(new Error(`Returned with ${res.status}`)))
      .then(data => data.error ? Promise.reject(new Error(data.error_message)) : data)
      .catch(err => console.error(err));
  }

  render() {
    return (
      <button className="link-btn" onClick={() => this.state.handler.open()}>Link</button>
    );
  }

}
