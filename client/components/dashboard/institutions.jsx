import React, { useState, useEffect } from 'react';
import Link from './link';

const Account = ({ itemClicked, account, color }) => {
  return (
    <li style={{ backgroundColor: color }} className="account">
      <h1 className="account-name">{account.name}</h1>
      <p className="account-mask">{account.mask}</p>
    </li>
  );
};

const Institution = ({ itemClicked, index, institution }) => {
  return (
    <div style={{backgroundColor:institution.color}} id={index} onClick={itemClicked} className="institution" >{institution.name}</div>
  );
};

const Institutions = ({ public_key, user }) => {
  const [view, setView] = useState({ name: 'institution', data: null });
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    if (user.accounts.length && !institutions.length) {
      fetch(`http://localhost:5001/api/fin/accounts?${user.accounts.reduce((acc, cur, idx) => acc + '&' + idx + '=' + cur,'')}`)
        .then(res => res.json())
        .then(data => setInstitutions(data.accounts))
        .catch(err => console.error(err));
    }
  }, [user])

  const institutionClicked = ({ target: { id } }) => setView({ name: 'accounts', data: institutions[id] });

  const accountClicked = ({ target: { id } }) => setView({ name: 'transactions', data: institutions.accounts[id] });

  const render = () => {
    if (view.name === 'institution') {
      return (
        <>
          {institutions
            ? <div className="institution-container">
                {institutions.map((inst, idx) => <Institution key={idx} itemClicked={institutionClicked} index={idx} institution={inst} />)}
              </div>
            : <h1>no accounts linked</h1>}
          <Link email={user.email} setInstitutions={setInstitutions} public_key={public_key} />
        </>
      )
    }
    if (view.name === 'accounts') {
      console.log(view.data)
      return (
        <ul className="account-container">
          {view.data.accounts.map((acc, idx) => <Account key={idx} itemClicked={accountClicked} account={acc} color={view.data.color} />)}
        </ul>
      );
    }
  }

  return (
    render()
  );
};

export default Institutions;
