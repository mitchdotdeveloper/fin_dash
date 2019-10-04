import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Get public key & render App component
(() => {
  var request = new XMLHttpRequest();
  request.open('POST', '/');
  request.responseType = 'json';
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      ReactDOM.render(<App public_key={request.response.public_key} />, document.getElementById('root'));
    }
  };
  request.setRequestHeader('Content-Type', 'application/json');
  request.send();
})();
