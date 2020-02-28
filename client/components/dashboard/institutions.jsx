import React, { useState, useEffect } from 'react';
import Link from './link';

const Institutions = ({ public_key, user }) => {
  const [view, setView] = useState({ name: 'institutions', data: null });
  const [institutions, setInstitutions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user.accounts.length && !institutions.length) {
      fetch(`http://localhost:5001/api/fin/accounts?${user.accounts.reduce((acc, cur, idx) => acc + '&' + idx + '=' + cur,'')}`)
        .then(res => res.json())
        .then(data => {
          console.log("from institutions", data.accounts);
          setInstitutions(data.accounts);
        })
        .catch(err => console.error(err));
    }
  }, [user, setInstitutions])

  useEffect(() => {
    if ( view.name === 'transactions' ) {
      fetch('http://localhost:5001/api/plaid/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({access_token: view.data.access_token})
      })
        .then(res => res.json())
        .then(data => setTransactions(data.transactions))
        .catch(err => console.error(err));
    }
  }, [view]);

  const institutionClicked = ({ target: { id } }) => setView({ name: 'transactions', data: institutions[id] });

  const render = () => {
    if (view.name === 'institutions') {
      return (
        <>
          {institutions
            ? <div className="institution-container">
              {institutions.map((inst, idx) => <div key={idx} style={{ backgroundColor: inst.color }} id={idx} onClick={institutionClicked} className="institution">{inst.name}</div>)}
              </div>
            : <h1>no accounts linked</h1>}
          <Link email={user.email} setInstitutions={acc => {
            let insts = [...institutions];
            console.log('insts before', insts)
            insts.push(acc);
            console.log('insts after', insts)
            setInstitutions(insts);
            }} public_key={public_key} />
        </>
      )
    }
    if (view.name === 'transactions') {
      return (
        <div className="transactions-container">
          {transactions
            ? <table className="transactions-table">
                <thead>
                  <tr className="transactions-table-headers">
                    <th className="transactions-table-header"></th>
                    <th className="transactions-table-header">name</th>
                    <th className="transactions-table-header">amount</th>
                    <th className="transactions-table-header">date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((trns, idx) => {
                    return (
                      <tr key={idx} className="transactions-table-row">
                        <td className="transactions-table-cell">{idx + 1}</td>
                        <td className="transactions-table-cell">{trns.name}</td>
                        <td className="transactions-table-cell">${trns.amount}</td>
                        <td className="transactions-table-cell">{trns.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            : <h1>no transactions</h1>}

        </div>
      );
    }
  }

  return (
    render()
  );
};

export default Institutions;
// account_id: "1QVDE3ykmbU8XvlJZQaqhQAX1AVKJ4U59nQD7"
// account_owner: null
// amount: 78.5
// authorized_date: null
// category: (2)["Recreation", "Gyms and Fitness Centers"]
// category_id: "17018000"
// date: "2020-01-14"
// iso_currency_code: "USD"
// location: { address: null, city: null, country: null, lat: null, lon: null, … }
// name: "Touchstone Climbing"
// payment_channel: "in store"
// payment_meta: { by_order_of: null, payee: null, payer: null, payment_method: null, payment_processor: null, … }
// pending: false
// pending_transaction_id: null
// transaction_id: "XxGDWE1ZByHdMPV4WmLlFQvAJDxyd5Idk7dvP"
// transaction_type: "place"
// unofficial_currency_code: null
