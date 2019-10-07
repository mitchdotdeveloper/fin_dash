import React, { Component } from 'react';
import './styles/dash.css';
import { Accounts, Account } from './Account';

class Dash extends Component {
  constructor(props) {
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
    fetch('/accounts/get', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: Returned with ${res.status}`))
    .then(data => this.setState({ accounts: data.accounts }))
    .catch(err => console.error(err));
  }

  getBalances() {
    fetch('/accounts/balance/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: Returned with ${res.status}`))
    .then(data => this.setState({ balance: data.accounts[0].balances.current }))
    .catch(err => console.error(err));
  }

  getTransactions() {
    fetch('/transactions/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: Returned with ${res.status}`))
    .then(data => this.setState({ transactions: data.data.transactions }))
    .catch(err => console.error(err));
  }

  handleAccountState(account) {
    this.setState({ accountSelected: account });
  }

  render() {
    return (
      <>
        <Account account={this.state.accountSelected} accountClosed={this.handleAccountState.bind(this)} />
        <Accounts accounts={this.state.accounts} accountClicked={this.handleAccountState.bind(this)} />
      </>
    );
  }
}
export default Dash;
