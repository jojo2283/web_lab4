const initialState = {
    radius: 1,
    xValue:null,
    yValue:null,
  };
  
  const radiusReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_RADIUS':
        return {
          ...state,
          radius: action.payload,
        };
        case 'SET_X':
        return {
          ...state,
          xValue: action.payload,
        };
        case 'SET_Y':
        return {
          ...state,
          yValue: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default radiusReducer;
  