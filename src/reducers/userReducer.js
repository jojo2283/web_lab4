const initialState = {
  userId: null,
  username: '',
  userData: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userId: action.payload,
      };
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload,
      };
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
