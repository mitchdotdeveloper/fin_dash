// AUTHORIZE REDUCER ACTIONS
/*
 * payload = {
 *  'authenticated': Boolean,
 *  'jwt': String
 * }
 */
export const login = payload => {
  return {
    type: 'LOGIN',
    payload
  };
};

export const logout = payload => {
  return {
    type: 'LOGOUT',
    payload
  };
};

export const updateToken = payload => {
  return {
    type: 'UPDATE_TOKEN',
    payload
  }
};

// USER REDUCER ACTIONS
/*
 * payload = {
 *  'first_name': String,
 *  'last_name': String,
 *  'email': String,
 *  'accounts': Array
 * }
 */
export const hydrateUser = payload => {
  return {
    type: 'HYDRATE_USER',
    payload
  };
};

export const emptyUser = () => {
  return {
    type: 'EMPTY_USER'
  };
};

export const addAccount = payload => {
  return {
    type: 'ADD_ACCOUNT',
    payload
  };
};

export const removeAccount = payload => {
  return {
    type: 'REMOVE_ACCOUNT',
    payload
  };
};