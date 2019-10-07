import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Get public key & render App component
(() => {
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: Returned with ${res.status}`))
    .then(data => ReactDOM.render(<App public_key={data.public_key} />, document.getElementById('root')))
    .catch(err => console.error(err));
})();
