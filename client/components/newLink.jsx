import React from 'react';
import './styles/link.css';

export default class Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handler: this.initializePlaidLink(),
      products: ['auth', 'transactions']
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
      product: this.state.products,
      onSuccess: this.linkSuccess.bind(this),
      onExit: this.linkExit.bind(this)
    });
  }

  render() {
    return (
      <div className="linkContent">
        <h1 className="linkContent__header">Link your account</h1>
        <button className="link-btn" onClick={() => this.state.handler.open()}>Link</button>
      </div>
    );
  }

}
