import React, { useState, useEffect } from 'react';
import Profile from './profile';
import Link from './link';
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
  const [linkPK, setLinkPK] = useState('');

  const navItems = ['profile', 'data', 'logout'];

  useEffect(() => {
    if ( linkPK === '' ) {
      fetch('http://localhost:5001/api')
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
        ?  <Profile user={user} />
        :  view === 'data'
           ?  <Link public_key={linkPK} />
           :  logout()}
    </>
  );
};

export default Dash;

// import React from 'react';
// import Link from './link';
// import '../styles/app.css';

// export default class App extends React.Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       public_key: null,
//       item: null
//     };
//   }

//   componentDidMount () {
//     fetch('http://localhost:5001', {
//       headers: { 'Content-type': 'application/json' }
//     })
//       .then(res => res.ok ? res.json() : Promise.reject(new Error(`Error: Returned with ${res.status}`)))
//       .then(data => this.setState({public_key: data.public_key}))
//       .catch(err => console.error(err));
//   }

//   loginSuccess (item) {
//     this.setState({item});
//   }

//   render () {
//     return (
//       this.state.public_key && !this.state.loginSuccess
//         ? <Link
//             public_key={this.state.public_key}
//             products={['auth', 'transactions']}
//             sendItem={this.loginSuccess.bind(this)} />
//         : null

//     );
//   }
// }
