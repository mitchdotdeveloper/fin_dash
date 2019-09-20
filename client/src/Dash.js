import React, { Component } from 'react';
import './Dash.css'

class Dash extends Component {
  constructor (props) {
    super(props);
    this.state = {
      balance: null,
      transactions: []
    }
    this.getBalances();
    this.getTransactions();
  }

  getBalances() {
    var request = new XMLHttpRequest();
    request.open('POST', '/accounts/balance/get');
    request.responseType = 'json';

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        console.log(request.response);
        this.setState({balance: request.response.accounts[0].balances.current});
      }
    };

    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
  }

  getTransactions() {
    var request = new XMLHttpRequest();
    request.open('POST', '/transactions/get');
    request.responseType = 'json';

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        console.log(request.response);
        this.setState({ transactions: request.response.data.transactions });
      }
    };

    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
  }

  render () {
    return (
      <>
        <h1>Hey! {this.state.balance}</h1>
      </>
    );
  }
}

export default Dash;
