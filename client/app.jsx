import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Auth from './components/auth';
import Dash from './components/dashboard/dash';
import './styles/app.css';

const App = () => {
  const auth = useSelector(state => state.authReducer);

  return (
    <>
      {auth.authenticated ? <Dash /> : <Auth />}
    </>
  );
}

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [auth, setAuthentication] = useState(false);

//   const authenticate = (user=null) => {
//     setUser(user);
//     setAuthentication(!!user);
//   }

//   return (
//     <>
//       {auth
//         ? <Dash user={user} logout={authenticate} />
//         : <Auth login={authenticate} />}
//     </>
//   );
// }

export default App;
