import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';

import MainApp from './components/MainApp';
import AuthPage from './components/AuthPage';

const App = () => {
  return (
    <AuthProvider>
      <RouterComponent />
    </AuthProvider>
  );
};

const RouterComponent = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard" element={<PrivateRoute><MainApp /></PrivateRoute>} />
        <Route path="/" element={<Navigate replace to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate replace to="/login" />;
};

export default App;
