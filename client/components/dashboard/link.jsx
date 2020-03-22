import React, { useState, useEffect } from 'react';

const Link = ({ email, public_key, institutions, setInstitutions }) => {
  const [link, setLink] = useState(null);
  const style = {
    'fontSize': '3.5rem',
    'margin': '2px',
    'border': 'none',
    'borderRadius': '5px',
    'backgroundColor': 'rgb(244, 244, 244)',
    'boxShadow': '0 4px rgb(213, 213, 213)'
  };

  const open = e => {
    e.preventDefault();
    link.open();
  };

  const onSuccess = (public_token, metadata) => {
    fetch('http://localhost:5001/api/plaid/get_access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token, email })
    })
      .then(res => res.json())
      // .then(data => console.log(institutions.concat(data.newAcc)) && link.close())
      .then(data => {
        console.log('Before concat:', institutions);
        let newinst = institutions.concat(data.newAcc);
        console.log('After concat:', newinst);
        link.close();
      })
      .catch(err => console.error(err));
  };

  const onExit = (err, metadata) => {
    console.log('Exited');
  }

  useEffect(() => {
    if ( link === null && public_key !== '' ) {
      setLink(
        Plaid.create({
          clientName: 'Fin Dash',
          env: 'sandbox',
          key: public_key,
          product: ['auth', 'transactions'],
          onSuccess: onSuccess,
          onExit: onExit
        })
      );
    }
  }, [link]);

  return (
    <button style={style} onClick={open}>Link</button>
  );
};

export default Link;

// institutions:
// [{ … }]
// 0:
// _id: "5e69d1ca86c8ab7f46256711"
// accounts: (8)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }]
// item: { available_products: Array(7), billed_products: Array(2), consent_expiration_time: null, error: null, institution_id: "ins_3", … }
// numbers: { ach: Array(2), bacs: Array(0), eft: Array(0), international: Array(0) }
// request_id: "uscjW19c2D6Og7F"
// status_code: 200
// name: "Chase"
// color: "#095aa6"
// access_token: "access-sandbox-c65469d4-214a-4881-a9e0-b206bda2402f"
// item_id: "rbBo785NbQt3119PGGkXTewVkebeyzIlARv3V"
// __proto__: Object
// length: 1
// __proto__: Array(0)

// institutions:
// [{ … }]
// 0:
// accounts: (8)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }]
// item: { available_products: Array(6), billed_products: Array(2), consent_expiration_time: null, error: null, institution_id: "ins_1", … }
// numbers: { ach: Array(2), bacs: Array(0), eft: Array(0), international: Array(0) }
// request_id: "1RZsczMOTOnb1ib"
// status_code: 200
// name: "Bank of America"
// color: "#e31837"
// access_token: "access-sandbox-72a6991b-ff43-4236-90ee-23ab76b6951e"
// item_id: "6MWX7GpZAKUe571nBqBKs7wePlK5D7UgWGdeZ"
// __proto__: Object
// length: 1
// __proto__: Array(0)