import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { Button, Container } from '@mui/material';
import '../AuthForm.css';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div>
      <table id='header-table'>
        <tbody>
          <tr>
            <td>
              <div >
                <p>Bermas Denis</p>
                <p>P3215</p>
              </div>
            </td>
            <td>
              <p className='right-center-allign'>8900</p>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="auth-container">
        <div className="auth-box">
          <h2>{isLoginView ? 'Authentication' : 'Registration'}</h2>

          {isLoginView ? (
            <>
              <Container maxWidth='lg'>
                <LoginPage />

                <Button variant="outlined" onClick={() => setIsLoginView(false)}>Go to Sign in</Button>
              </Container>
            </>
          ) : (
            <>
              <RegisterPage />

              <Button variant="outlined" onClick={() => setIsLoginView(true)}>Go to log in</Button>
            </>
          )}



        </div>
      </div>


    </div>
  );
};

export default AuthPage;

