import React, { useState, useEffect } from 'react';
import Auth from './auth';
import Dash from './dashboard/dash';
import '../styles/app.css';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    !user
      ? <Auth authenticatedUser={setUser} />
      : <Dash user={user} logout={() => setUser(null)} />
  );
}

export default App;
