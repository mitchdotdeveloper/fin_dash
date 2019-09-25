import React from 'react';

export const Accounts = ({accounts, accountClicked}) => {
  if (accounts) {
    return (
      <div className="root__dashboard">
        <div className="dashboard__header">Your Accounts</div>
        <div className="dashboard__content--container">
          <div className="dashboard__card--container">
            {Object.keys(accounts).map(
              account => {
                return (
                <div className="dashboard__card" key={account} onClick={() => accountClicked(accounts[account])}>
                  <div className="card__header--accountName">
                    {accounts[account].name || accounts[account].official_name}
                  </div>
                  <span className="card__data--cardNumber">
                    ******* {accounts[account].mask}
                  </span><br></br>
                </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export const Account = ({account, accountClosed}) => {
  if (account) {
    return (
      <>
        <div className="card__modal--container">
          <div className="modal__content--container">
            <div className="modal__content">
              <div className="content__account" key={account.account_id}>
                <div className="account__accountName">{account.official_name || account.name}</div>
                <div className="account__cardNumber">******* {account.mask}</div>
                <div className="account__type">Type: {account.type}</div>
                <div className="account__header--balance">Balance</div>
                <div className="account__balanceAvailable">Available: {account.balances.available || '*'}</div>
                <div className="account__currentBalance">Current: {account.balances.current || '*'}</div>
                <div className="account__balanceLimit">Limit: {account.balances.limit || '*'}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal__background--overlay" onClick={() => accountClosed(null)}></div>
      </>
    );
  } else {
    return null;
  }
};
