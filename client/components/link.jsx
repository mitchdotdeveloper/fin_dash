import React from 'react';
import '../styles/link.css';

export default class Link extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      plaidLink: null
    }
  }

  open (e) {
    e.preventDefault();
    this.state.plaidLink.open();
  }

  onSuccess (public_token, metadata) {
    this.sendToken(public_token, metadata)
      .then(res => this.getItems())
      .then(item => this.props.sendItem(item))
      .catch(err => console.error(err))
  }

  onExit (err, metadata) {

  }

  sendToken (public_token, metadata) {
    return fetch('http://localhost:5001/get_access_token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ public_token: public_token })
      })
      .then(res => res.ok ? res.json() : Promise.reject(new Error(`Returned with ${res.status}`)))
      .then(data => data.error ? Promise.reject(new Error(data.error_message)) : data)
      .catch(err => console.error(err))
  }

  getItems () {
    return fetch('http://localhost:5001/item/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.ok ? res.json() : Promise.reject(new Error(`Returned with ${res.status}`)))
      .then(data => data.error ? Promise.reject(new Error(data.error_message)) : data)
      .catch(err => console.error(err));
  }

  componentDidMount () {
    let plaidLink = Plaid.create({
      clientName: 'Fin Dash',
      env: 'sandbox',
      key: this.props.public_key,
      product: this.props.products,
      onSuccess: this.onSuccess.bind(this),
      onExit: this.onExit.bind(this)
    });
    this.setState({plaidLink});
  }

  render () {
    return (
      <button className="link-btn" onClick={this.open.bind(this)}>
        Link
      </button>
    );
  }
}
