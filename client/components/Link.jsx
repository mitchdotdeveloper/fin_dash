import React from 'react';
import './styles/link.css';

export default class Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handler: this.initializePlaidLink()
    };
  }

  linkSuccess() {

  }

  linkExit() {

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
    fetch('/get_access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token: public_token })
    })
      .then(res => res.ok ? res.json() : Promise.reject(new Error(`Error: Returned with ${res.status}`)))
      .then(data => data.err ? Promise.reject(new Error(`Error: ${data.error_message}`)) : this.getItems())
      .catch(err => console.error(err));
  }

  getItems() {
    fetch('/item/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.ok ? res.json() : Promise.reject(new Error(`Error: Returned with ${res.status}`)))
      .then(data => {
        if (data.err) {
          Promise.reject(new Error(`Error ${data.error_message}`));
        } else {
          this.props.update_item(data);
          this.props.unmountSelf();
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <button className="link-btn" onClick={() => this.state.handler.open()}>Link</button>
    );
  }

}
