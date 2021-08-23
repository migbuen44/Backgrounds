const loginReducer = (state = { isLoggedIn: false }, action) => {
  if (action.type === 'SET_LOGIN_STATUS') {
    return { value: action.value };
  }
  return state;
};

export default loginReducer;
