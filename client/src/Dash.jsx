import React, { Component } from 'react';
import './Dash.css'

class Dash extends Component {
  constructor (props) {
    super(props);
    this.state = {
      accounts: null,
      balance: null,
      transactions: null,
      accountClicked: null,
      balanceClicked: false,
      transactionClicked: false
    }

    console.log(this.props.available_products);

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

  handleAccountClicked (account) {
    this.setState( {accountClicked: account} );
  }

  _renderAccount (account) {
    return (
      <div className="content__account" key={account.account_id}>
        <div className="account__accountName">{account.official_name}</div>
        <span className="account__cardNumber">******* {account.mask}</span>
        <span className="account__type">Type: {account.type}</span>
        <div className="account__header--balance">Balance</div>
        <span className="account__balanceAvailable">Available: {account.balances.available || '*'}</span>
        <span className="account__currentBalance">Current: {account.balances.current || '*'}</span>
        <span className="account__balanceLimit">Limit: {account.balances.limit || '*'}</span>
      </div>
    );
  }

  _renderAccountCards () {
    return Object.keys( this.state.accounts ).map(account => {
      console.log(account);
      return (
        <div className="dashboard__card" key={account} onClick={this.handleAccountClicked.bind(this, this.state.accounts[account])}>
          <div className="card__header--accountName">{this.state.accounts[account].name ||
                                                      this.state.accounts[account].official_name}</div>
          <span className="card__data--cardNumber">******* {this.state.accounts[account].mask}</span><br></br>
        </div>
      );
    });
  }

  render () {
    if (this.state.accountClicked) {
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
              <div className="modal__content">{this._renderAccount(this.state.accountClicked)}</div>
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
              {this._renderAccountCards()}
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
