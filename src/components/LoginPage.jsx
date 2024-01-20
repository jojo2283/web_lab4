import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button, TextField } from '@mui/material';
import '../AuthForm.css';



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);


  const handleLogin = async () => {

    setError(null);

    try {

      const response = await fetch('http://localhost:8080/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data) {
        authContext.login(username);
        authContext.toStorage(data.id, data.hitsList);

        navigate('/dashboard');
      } else {
        setError('Неверное имя пользователя или пароль');
      }
    } catch (err) {
      console.error('Ошибка при отправке запроса: ', err);
      setError('Ошибка при попытке входа');

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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
