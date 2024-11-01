import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import './signup.css'

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const validate = () => {
    let errorMessage = '';

    if (!name) errorMessage = 'Name is required';
    else if (!email) errorMessage = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errorMessage = 'Unsupported email format';
    else if (!password) errorMessage = 'Password is required';
    else if (password !== confirmPassword) errorMessage = 'Passwords do not match';

    if (errorMessage) {
      showSnackbar(errorMessage, 'error');
      return false;
    }
    return true;
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    if (photo) formData.append('photo', photo); // Attach the photo file

    try {
      const response = await fetch('http://localhost:3005/Go2Code/quiz/auth/signup', {
        method: 'POST',
        body: formData, // Send as FormData
      });

      if (response.ok) {
        showSnackbar('Signup successful', 'success');
        setTimeout(() => (window.location.href = '/login'), 3000);
      } else {
        showSnackbar('Signup failed', 'error');
      }
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, 'error');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <div className="upperLayer">
      <div className="loginContainer">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="name">
            <label htmlFor="name">Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="email">
            <label htmlFor="email">Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="password">
            <label htmlFor="password">Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="confirmPassword">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <div className="photo">
            <label htmlFor="photo">Photo:</label>
            <input type="file" accept="image/jpeg, image/png" name='photo' onChange={(e) => setPhoto(e.target.files[0])} />
          </div>
          <div className="submit">
            <input type="submit" value="Register" />
            <input type="reset" value="Reset" />
          </div>
          <div className="login">
            <p>If you have registered, <Link to='/login'>Login</Link></p>
          </div>
        </form>
      </div>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signup;
