const loginReducer = (state = { isLoggedIn: false }, action) => {
  if (action.type === 'SET_LOGIN_STATUS') {
    if (typeof action.value !== 'boolean') {
      return state;
    }
    return { value: action.value };
  }
  return state;
};

export default loginReducer;
