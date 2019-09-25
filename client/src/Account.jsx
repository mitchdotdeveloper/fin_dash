import React from 'react';

export const Accounts = ({accounts, accountClicked}) => {
  return Object.keys(accounts).map(account => {
    return (
      <div className="dashboard__card" key={account} onClick={() => accountClicked(accounts[account])}>
        <div className="card__header--accountName">{accounts[account].name || accounts[account].official_name}</div>
        <span className="card__data--cardNumber">******* {accounts[account].mask}</span><br></br>
      </div>
    );
  });
};

export const Account = ({account}) => {
  return (
    <div className="content__account" key={account.account_id}>
      <div className="account__accountName">{account.official_name}</div>
      <div className="account__cardNumber">******* {account.mask}</div>
      <div className="account__type">Type: {account.type}</div>
      <div className="account__header--balance">Balance</div>
      <div className="account__balanceAvailable">Available: {account.balances.available || '*'}</div>
      <div className="account__currentBalance">Current: {account.balances.current || '*'}</div>
      <div className="account__balanceLimit">Limit: {account.balances.limit || '*'}</div>
    </div>
  );
};
