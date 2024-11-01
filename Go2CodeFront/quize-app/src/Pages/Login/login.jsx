import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar, Alert, linkClasses } from "@mui/material";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoading(true);
      buildSnackbar('Authenticating...', 'info');
    }
  }, []);

  const validate = () => {
    let error = '';
    if (!email || !password) {
      error = 'Please fill in all fields.';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      error = 'Invalid email address.';
    }
    if (error) {
      buildSnackbar(error, 'error');
      return false;
    }
    return true;
  };

  const buildSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSeverity(severity);
    setSnackbarOpen(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3005/Go2Code/quiz/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        buildSnackbar('Unable to login', 'error');
        setIsLoading(false);
        return;
      }

      const result = await response.json();
      if (result.status === 'fail') {
        buildSnackbar(result.data.message, 'error');
        setIsLoading(false);
        return;
      }

      const { name, url, token } = result.data;
      console.log('login url: ' + url,name);

      // Dispatch user data to the Redux store
      dispatch({ type: 'SET_USER', payload: { name, url } });


      // Store token in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user',JSON.stringify({url, name}))

      buildSnackbar('Login successful!', 'success');
      
      // Redirect to the dashboard after a brief delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      buildSnackbar('Error: ' + error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="loginContainer">
      <h3>Login</h3>
      <form onSubmit={submitHandler}>
        <div className="email">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="submit">
          <input type="submit" value={isLoading ? "Loading..." : "Login"} />
        </div>
        <div className="message">
          <p>
            If you don't have an account, <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>

      {/* Snackbar for messages */}
      <Snackbar
        open={snackbarOpen}
        onClose={closeSnackbar}
        autoHideDuration={3500}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={severity}
          sx={{ width: 'max-content', backgroundColor: 'rgb(230,240,250)', color: 'black' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
