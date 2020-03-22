import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/actions';

import Auth from './components/auth';
import Dash from './components/dashboard/dash';
import './styles/app.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [auth, setAuthentication] = useState(false);

  const authenticate = (user=null) => {
    setUser(user);
    setAuthentication(!!user);
  }

  return (
    <>
      {auth
        ? <Dash user={user} logout={authenticate} />
        : <Auth login={authenticate} />}
    </>
  );
}

export default App;
