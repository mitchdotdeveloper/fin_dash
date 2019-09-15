$(document).ready(initializeApp);

function initializeApp () {
  var handler = Plaid.create({
    clientName: 'Fin Dash',
    env: 'sandbox',
    product: 'transactions',
    key: '7bf1d2c9b6d6fd3df039a11ef9a29a',
    countryCodes: 'US'.split(','),
    // webhook: 'https://your-domain.tld/plaid-webhook',
    onSuccess: public_token => {
      $.post('/get_access_token', {
        public_token: public_token
      });
    }
  });
  handler.open();
}
