import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import radiusReducer from'./reducers/radiusReducer';
const rootReducer = combineReducers({
  user: userReducer,
  radius: radiusReducer,
});

const store = createStore(rootReducer);

export default store;
