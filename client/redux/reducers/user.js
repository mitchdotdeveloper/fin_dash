const initialState = {
  'first_name': '',
  'last_name': '',
  'email': '',
  'accounts': []
}

const userReducer = (state=initialState, action) => {
  switch( action.type ) {
    case 'AUTHENTICATE':
      return Object.assign({}, state, {
        'first_name': action.payload.first_name,
        'last_name': action.payload.last_name,
        'email': action.payload.email,
        'accounts': action.payload.accounts
      });
    case 'ADD_ACCOUNT':
      return Object.assign({}, state, {
        'accounts': [...state.accounts, action.payload.account]
      });
    case 'REMOVE_ACCOUNT':
      return Object.assign({}, state, {
        'accounts': action.payload.new_accounts
      });
    default:
      return state;
  }
};

export default userReducer;