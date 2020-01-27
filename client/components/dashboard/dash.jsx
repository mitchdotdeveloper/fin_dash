import React, { useState, useEffect } from 'react';
import Profile from './profile';
import '../../styles/dash.css';

const Nav = ({ itemClicked, items }) => {
  return (
    <ul className="nav-bar">
      {items.map((itm, idx) => <li key={idx}
        id={itm}
        className="nav-item"
        onClick={itemClicked}>{itm}</li>)}
    </ul>
  );
};

const Dash = ({ user, logout }) => {
  const [view, setView] = useState('profile');

  const navItems = ['profile', 'data', 'logout'];

  const itemClicked = ({ target: { id } }) => setView(id);

  return (
    <>
      <Nav itemClicked={itemClicked} items={navItems} />
      {view === 'profile' && <Profile user={user} />}
      {view === 'data' && null}
      {view === 'logout' && logout()}
    </>
  );
};

export default Dash;
