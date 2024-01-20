import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { setUser, setUserData } from '../actions/userActions';
import { Button, TextField } from '@mui/material';


const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleRegister = async () => {

    setError(null);

    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        try {

          const response = await fetch('http://localhost:8080/users/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });

          const data = await response.json();

          if (data != null) {
            authContext.login(username, password);
            authContext.toStorage(data.id, data.hitsList);


            dispatch(setUser(data.id));
            dispatch(setUserData(data.hitsList));

            navigate('/dashboard');
          } else {
            setError('Неверное имя пользователя или пароль');
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
