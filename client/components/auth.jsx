import React, { useState, useEffect } from 'react';

const Auth = ({ login }) => {
  const [credentials, setCredentials] = useState({
    signIn: { email: '', password: '' },
    signUp: { email: '', first_name: '', last_name: '', password: '' }
  });
  const [authenticationMessage, setAuthenticationMessage] = useState('');
  const [view, setView] = useState('signIn');

  const fieldsEmpty = obj => {
    for (let k in obj) {
      if (obj[k] === '') return true
    }
    return false;
  };

  const inputChange = ({ target: { name, value } }) => {
    let user = { ...credentials };
    user[view][name] = value;
    setCredentials(user);
    authenticationMessage && setAuthenticationMessage('')
  };

  const authenticate = () => {
    if (fieldsEmpty(credentials[view])) {
      setAuthenticationMessage('please fill out all fields')
    } else {
      fetch(`http://localhost:5001/auth/sign-${view === 'signIn' ? 'in' : 'up'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials[view])
      })
        .then(res => res.json())
        .then(data => data.authenticated ? login(data.user) : setAuthenticationMessage(data.message))
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="auth-container">
      <div className="input-container">
        <span className="input-wrapper" name="email">
          <input type="text"
            name="email"
            className="input-box"
            value={credentials[view].email}
            onChange={inputChange}
            required></input>
        </span>
        {view === 'signUp'
          ? <>
            <span className="input-wrapper" name="first name">
              <input type="text"
                name="first_name"
                className="input-box"
                value={credentials[view].first_name}
                onChange={inputChange}
                required></input>
            </span>
            <span className="input-wrapper" name="last name" >
              <input type="text"
                name="last_name"
                className="input-box"
                value={credentials[view].last_name}
                onChange={inputChange}
                required></input>
            </span>
          </>
          : null}
        <span className="input-wrapper" name="password" >
          <input type="password"
            name="password"
            className="input-box"
            value={credentials[view].password}
            onChange={inputChange}
            required></input>
        </span>
      </div>
      <button className="login-btn"
        message={authenticationMessage}
        onClick={authenticate}>
        {view === "signIn" ? 'login' : 'register'}
      </button>
      <div className="login-links">
        <button className="signup login-link"
          onClick={() => setView(view === 'signUp' ? 'signIn' : 'signUp')}>
          {view === "signIn" ? 'sign up' : 'sign in'}
        </button>
        <button className="forgot-password login-link">forgot your password?</button>
      </div>
    </div>
  );
}

export default Auth;
