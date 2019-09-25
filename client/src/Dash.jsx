import React, { Component } from 'react';
import './Dash.css'
import { Accounts, Account } from './Account';
// import Accounts from './Account';

class Dash extends Component {
  constructor (props) {
    super(props);
    this.state = {
      accounts: null,
      balance: null,
      transactions: null,
      accountSelected: null,
      balanceClicked: false,
      transactionClicked: false
    }
    this.getAccounts();
  }

  getAccounts() {
    var request = new XMLHttpRequest();
    request.open('POST', '/accounts/get');
    request.responseType = 'json';

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
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
        this.setState({ transactions: request.response.data.transactions });
      }
    };

    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
  }

  handleAccountClicked (account) {
    this.setState( {accountSelected: account} );
  }

  render () {
    if (this.state.accountSelected) {
      return (
        <>
          <div className="card__modal--container">
            <div className="modal__nav--container">
              <ul className="modal__nav--list">
                <li className="nav__list--item" onClick={() => this.setState({ balanceClicked: true })}>Balance</li>
                <li className="nav__list--item" onClick={() => this.setState({ transactionClicked: true })}>Transactions</li>
              </ul>
            </div>
            <div className="modal__content--container">
              <div className="modal__content"><Account account={this.state.accountSelected}/></div>
            </div>
          </div>
          <div className="modal__background--overlay"></div>
        </>
      );
    } else if (this.state.accounts) {
      return (
        <div className="root__dashboard">
          <div className="dashboard__header">Your Accounts</div>
          <div className="dashboard__content--container">
            <div className="dashboard__card--container">
              <Accounts accounts={this.state.accounts} accountClicked={this.handleAccountClicked.bind(this)}/>
            </div>
          </div>
        </div>
      );
    } else if (!this.state.accounts || !this.state.balance || !this.state.transactions) {
      return (
        <>
          <h1>One Sec ...</h1>
        </>
      );
    }
    // else if (this.state.balance) {
    //   return (
    //     <>
    //     </>
    //   );
    // } else if (this.state.transactions) {
    //   return (
    //     <>
    //     </>
    //   );
    // }
  }
}

export default Dash;
