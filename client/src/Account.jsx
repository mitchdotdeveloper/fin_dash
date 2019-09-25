import React from 'react';

const Accounts = ({accounts, accountClicked}) => {
  return Object.keys(accounts).map(account => {
    return (
      <div className="dashboard__card" key={account} onClick={() => accountClicked(accounts[account])}>
        <div className="card__header--accountName">{accounts[account].name || accounts[account].official_name}</div>
        <span className="card__data--cardNumber">******* {accounts[account].mask}</span><br></br>
      </div>
    );
  });
};

// const Account = props => {

// };

export default Accounts;
// export default { Account, Account };
