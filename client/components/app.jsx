import React, { useState, useEffect } from 'react';
import Auth from './auth';
import Dash from './dashboard/dash';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    user
      ? <Auth authenticatedUser={setUser} />
      : <Dash user={user} logout={() => setUser(null)} />
  );
}

export default App;
