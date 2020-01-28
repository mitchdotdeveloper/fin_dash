import React, { useState, useEffect } from 'react';
import Auth from './auth';
import Dash from './dashboard/dash';
import '../styles/app.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [auth, setAuthentication] = useState(false);

  const authenticate = (user=null) => {
    setUser(user);
    setAuthentication(!!user);
  }

  return (
    !auth
      ? <Auth login={authenticate} />
      : <Dash user={user} logout={authenticate} />
  );
}

export default App;
