import React, { useState, useEffect } from 'react';
// import '../styles/link.css';

const Link = ({ public_key }) => {
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
      body: JSON.stringify({ public_token })
    })
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.error(err));
  }

  const onSuccess = (public_token, metadata) => {
    sendToken(public_token)
      .then(res => console.log(res))
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

// export default class Link extends React.Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       plaidLink: null
//     }
//   }

//   open (e) {
//     e.preventDefault();
//     this.state.plaidLink.open();
//   }

  // onSuccess (public_token, metadata) {
  //   this.sendToken(public_token, metadata)
  //     .then(res => this.getItems())
  //     .then(item => this.props.sendItem(item))
  //     .catch(err => console.error(err))
  // }

  // onExit (err, metadata) {

  // }

  // sendToken (public_token, metadata) {
  //   return fetch('http://localhost:5001/get_access_token', {
  //       method: 'POST',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify({ public_token: public_token })
  //     })
  //     .then(res => res.ok ? res.json() : Promise.reject(new Error(`Returned with ${res.status}`)))
  //     .then(data => data.error ? Promise.reject(new Error(data.error_message)) : data)
  //     .catch(err => console.error(err))
  // }

  // getItems () {
  //   return fetch('http://localhost:5001/item/get', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  //     .then(res => res.ok ? res.json() : Promise.reject(new Error(`Returned with ${res.status}`)))
  //     .then(data => data.error ? Promise.reject(new Error(data.error_message)) : data)
  //     .catch(err => console.error(err));
  // }

//   componentDidMount () {
//     let plaidLink = Plaid.create({
//       clientName: 'Fin Dash',
//       env: 'sandbox',
//       key: this.props.public_key,
//       product: this.props.products,
//       onSuccess: this.onSuccess.bind(this),
//       onExit: this.onExit.bind(this)
//     });
//     this.setState({plaidLink});
//   }

//   render () {
//     return (
//       <button className="link-btn" onClick={this.open.bind(this)}>
//         Link
//       </button>
//     );
//   }
// }
