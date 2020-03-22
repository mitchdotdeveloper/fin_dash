const initialState = {
  'authenticated': false,
  'jwt': ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, {
        'authenticated': true,
        'jwt': action.payload.jwt
      });
    case 'LOGOUT':
      return Object.assign({}, state, {
        'authenticated': false,
        'jwt': ''
      });
    case 'UPDATE_TOKEN':
      return Object.assign({}, state, {
        'jwt': action.payload.jwt
      });
    default:
      return state;
  }
};

export default authReducer;