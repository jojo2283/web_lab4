export const setUser = (userId) => {
  return {
    type: 'SET_USER',
    payload: userId,
  };
};
export const setUserData = (data) => {
  return {
    type: 'SET_USER_DATA',
    payload: data,
  };
};
export const setUsername = (username) => {
  return {
    type: 'SET_USERNAME',
    payload: username,
  };
};