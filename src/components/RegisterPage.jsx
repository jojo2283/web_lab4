import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { setUser, setUserData } from '../actions/userActions';
import { Button, TextField } from '@mui/material';


const RegisterPage = () => {
  const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [noneHashpassword, setNoneHashPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();
  const md5 = require('md5')


  const handleRegister = async () => {

    setError(null);
    let password = (md5(noneHashpassword));

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        try {



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

            if (data != null) {
              authContext.login(username);
              authContext.toStorage(data.id, data.hitsList);


              dispatch(setUser(data.id));
              dispatch(setUserData(data.hitsList));

              navigate('/dashboard');
            } else {
              setError('Неверное имя пользователя или пароль');
            }
          }
        } catch (err) {
          console.error('Ошибка при отправке запроса: ', err);
          setError('Ошибка при попытке входа');

        }
      } else {
        setError('Ошибка регистрации (такой пользователь уже существует)');
      }
    } catch (err) {
      setError('Ошибка при регистрации');
    }
  };

  return (
    <div>
      <div style={{ margin: '10px' }}>
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
          onClick={handleRegister}
        >Sign in</Button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterPage;
