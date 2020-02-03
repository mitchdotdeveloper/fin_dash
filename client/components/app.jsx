import React, { useState, useEffect } from 'react';
import Auth from './auth';
import Dash from './dashboard/dash';
import '../styles/app.css';

const Header = ({ main }) => {
  return main ? <i style={{ fontSize: "10rem" }} className="fas fa-credit-card"></i> : <i style={{ fontSize: "5rem", position: "absolute" }} className="fas fa-credit-card"></i>;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [auth, setAuthentication] = useState(false);

  const authenticate = (user=null) => {
    setUser(user);
    setAuthentication(!!user);
  }

  return (
    <>
      <Header main={!auth} />
      {auth
        ? <Dash user={user} logout={authenticate} />
        : <Auth login={authenticate} />}
    </>
  );
}

export default App;
