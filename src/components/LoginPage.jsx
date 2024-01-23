import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button, TextField } from '@mui/material';
import '../AuthForm.css';



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [noneHashpassword, setNoneHashPassword] = useState('');
  const md5 = require('md5')
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);



  const handleLogin = async () => {

    let password = (md5(noneHashpassword));


    setError(null);

    try {

      const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 403) {

        setError('Неверное имя пользователя или пароль');
      }

      if (response.status === 400) {
        setError('Ошибка при попытке входа');
      }
      const tokenData = await response.json();

      if (tokenData != null) {
        sessionStorage.setItem('token', tokenData.token);

        const getResponse = await fetch('http://localhost:8080/users?id=' + tokenData.id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenData.token
          },
        })
        const data = await getResponse.json();
        if (response.status === 403) {
          console.error('Invalid token ');
        }
        else {
          if (response.status === 200) {
            if (data) {
              authContext.login(username);
              authContext.toStorage(data.id, data.hitsList);

              navigate('/dashboard');
            } else {
              setError('Неверное имя пользователя или пароль');
            }
          }
        }




      }
    } catch (err) {

      console.error('Ошибка при отправке запроса: ', err);
      if (error === null){
        setError('Ошибка при попытке входа');
      }
      
    }

  };

  // Отображение компонента с формой входа, кнопкой и обработкой ошибок
  return (
    <div>
      <div className='auth-page'>

        <TextField
          required

          id="outlined-basic" label="Username" variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

      </div>

      <TextField
        required

        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={noneHashpassword}
        onChange={(e) => setNoneHashPassword(e.target.value)}
      />


      <div style={{ margin: '7px 0px 0px 0px' }}>
        <Button

          variant="outlined"
          onClick={handleLogin}>Log in</Button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
