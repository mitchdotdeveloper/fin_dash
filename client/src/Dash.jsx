import React, { Component } from 'react';
import './Dash.css'

class Dash extends Component {
  constructor (props) {
    super(props);
    this.state = {
      accounts: null,
      balance: null,
      transactions: []
    }

    this.getAccounts();
  }

  getAccounts() {
    var request = new XMLHttpRequest();
    request.open('POST', '/accounts/get');
    request.responseType = 'json';

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        console.log(request.response.accounts);
        this.setState({ accounts: request.response.accounts });
      }
    };

    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
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

  formatAccounts () {
    return Object.keys( this.state.accounts ).map(account => {
      return (
        <div className="dashboard__card" key={account}>
          <div className="card__header--account">Account Name</div>
          <span className="card__data">{this.state.accounts[account].official_name || this.state.accounts[account].name}</span><br></br>
          <div className="card__header--account">Account Type</div>
          <span className="card__data">{this.state.accounts[account].type || 'Unavailable'}</span><br></br><br></br>
        </div>
      );
    });
  }

  render () {
    if (!this.state.accounts) {
      return (
        <>
          <h1>One Sec ...</h1>
        </>
      );
    } else {
      return (
        <div className="root__dashboard">
          <div className="dashboard__header">Your Accounts!</div>
          <div className="dashboard__content--container">
            <div className="dashboard__card--container">
              {this.formatAccounts()}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Dash;
