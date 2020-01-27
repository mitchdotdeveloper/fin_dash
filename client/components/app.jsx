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
