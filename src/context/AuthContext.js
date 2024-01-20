import React, { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setUserData, setUsername } from '../actions/userActions';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();


  const storedIsAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
  const [isAuthenticated, setIsAuthenticated] = useState(storedIsAuthenticated);


  const storedUsername = sessionStorage.getItem('username');

  const storedID = sessionStorage.getItem('userId');
  const storedUserData = JSON.parse(sessionStorage.getItem('userData'));


  dispatch(setUser(storedID));
  dispatch(setUserData(storedUserData));
  dispatch(setUsername(storedUsername))


  const login = (user) => {
    setIsAuthenticated(true);
    dispatch(setUsername(user));
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('username', user);


  };

  const toStorage = (userId, userData) => {
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('userData', JSON.stringify(userData));
    dispatch(setUser(userId));
    dispatch(setUserData(userData));

  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userData');

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, toStorage }}>
      {children}
    </AuthContext.Provider>
  );
};
