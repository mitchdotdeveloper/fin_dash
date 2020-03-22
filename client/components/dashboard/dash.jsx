import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, emptyUser } from '../../redux/actions';
import Profile from './profile';
import Institutions from './institutions';
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

const Dash = () => {
  const user = useSelector(state => state.userReducer);
  const [view, setView] = useState('profile');
  const [linkPK, setLinkPK] = useState('');
  const dispatch = useDispatch();

  const navItems = ['profile', 'institutions', 'logout'];

  useEffect(() => {
    if (linkPK === '') {
      fetch('http://localhost:5001/api/plaid/public_key')
        .then(res => res.json())
        .then(data => setLinkPK(data.public_key))
        .catch(err => console.error(err));
    }
  }, [linkPK]);

  const itemClicked = ({ target: { id } }) => setView(id);

  return (
    <>
      <Nav itemClicked={itemClicked} items={navItems} />
      {view === 'profile'
        ? <Profile user={user} />
        : view === 'institutions'
          ? <Institutions public_key={linkPK} user={user} />
          : (() => {
              dispatch(emptyUser());
              dispatch(logout({}));
            })()}
    </>
  );
};

export default Dash;
