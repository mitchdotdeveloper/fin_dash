import React, { useState, useEffect } from 'react';

const Link = ({ email, setInstitutions, public_key }) => {
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
    fetch('http://localhost:5001/api/plaid/add-institution', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token, email })
    })
      .then(res => res.json())
      .then(data => {
        console.log("from link", data.accounts)
        setInstitutions(data.accounts);
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
