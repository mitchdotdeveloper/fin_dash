import React, { useState, useEffect } from 'react';
import Link from './link';

const Account = ({ account }) => {
  return (
    <h1 style={{"color":account.color}}>{account.name}</h1>
  );
};

const Accounts = ({ public_key, user }) => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if ( user.accounts.length && !accounts.length ) {
      fetch('http://localhost:5001/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accounts: user.accounts })
      })
        .then(res => res.json())
        .then(data => setAccounts(data.accounts))
        .catch(err => console.error(err));
    }
  }, [user])

  return (
    <>
      {accounts
        ? <div className="account-container">
          {accounts.map((acc, idx) => <Account key={idx} account={acc} />)}
          </div>
        : <h1>No accounts linked</h1>}
      <Link email={user.email} setAccounts={setAccounts} public_key={public_key} />
    </>
  );
};

export default Accounts;
