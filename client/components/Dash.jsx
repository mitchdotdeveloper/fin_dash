mport React, { Component } from 'react';
import './Dash.css'
import { Accounts, Account } from './Account';
// import Accounts from './Account';

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
        this.setState({ balance: request.response.accounts[0].balances.current });
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
