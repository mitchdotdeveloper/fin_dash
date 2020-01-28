import React, { useState, useEffect } from 'react';

const Link = ({ email, public_key }) => {
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

  const sendToken = public_token => {
    return fetch('http://localhost:5001/api/get_access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token, email })
    })
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.error(err));
  }

  const onSuccess = (public_token, metadata) => {
    sendToken(public_token)
      // .then(res => console.log(res))
      // .then(res => {
      //   console.log(res.token);
      //   return fetch('http://localhost:5001/api/accounts/get', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ access_token: res.access_token })
      // })
      //   .then(data => data.json())
      //   .then(d => console.log(d));})
      // .catch(err => console.error(err));
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
