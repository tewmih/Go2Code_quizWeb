// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import './signup.css';

// function Signup() {
//   const [errors, setErrors] = useState([]);
//   const [dialogMessage, setDialogMessage] = useState('');
//   const [openDialog, setOpenDialog] = useState(false);

//   const name = useSelector((state) => state.name);
//   const email = useSelector((state) => state.email);
//   const password = useSelector((state) => state.password);
//   const confirmPassword = useSelector((state) => state.confirmPassword);

//   const dispatch = useDispatch();

//   const validate = () => {
//     const errorPool = [];

//     if (!name) errorPool.push('Name is required');
//     if (!email) {
//       errorPool.push('Email is required');
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       errorPool.push('Unsupported email format');
//     }
//     if (!password) errorPool.push('Password is required');
//     if (password !== confirmPassword) errorPool.push('Password confirmation failed (not the same)');

//     setErrors(errorPool);
//     return errorPool.length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) {
//       console.log('Error(s) occurred during validation');
//       return;
//     }

//     try {
//       const response = await fetch('/Go2Code/quize/auth', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           confirmPassword,
//         }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setDialogMessage('Signup successful');
//         setOpenDialog(true);
//         console.log(result);
//         setTimeout(() => {
//           window.location.href = '/login'; // Redirect after showing success dialog
//         }, 2000);
//       } else {
//         setDialogMessage('Signup failed: ' + response.statusText);
//         setOpenDialog(true);
//       }
//     } catch (error) {
//       setDialogMessage('Error: ' + error.message);
//       setOpenDialog(true);
//     }
//   };

//   const closeHandler = () => {
//     setOpenDialog(false);
//   };

//   return (
//     <div className='upperLayer'>
//       {errors.length === 0 ? (
//         <div className="loginContainer">
//           <h2>Register</h2>
//           <form onSubmit={handleSubmit} className="form">
//             <div className="name">
//               <label htmlFor="name">Name: </label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => dispatch({ type: 'name', payload: e.target.value })}
//               />
//             </div>
//             <div className="email">
//               <label htmlFor="email">Email: </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => dispatch({ type: 'email', payload: e.target.value })}
//               />
//             </div>
//             <div className="password">
//               <label htmlFor="password">Password: </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => dispatch({ type: 'password', payload: e.target.value })}
//               />
//             </div>
//             <div className="confirmPassword">
//               <label htmlFor="confirm">Confirm Password: </label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => dispatch({ type: 'confirmPassword', payload: e.target.value })}
//               />
//             </div>
//             <div className="submit">
//               <input type="submit" value="Register" />
//               <input type="reset" value="Reset" />
//             </div>
//             <div className="login">
//               <p>If you have registered, <Link to='/login'>Login</Link></p>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <div className='errorContainer'>
//           <ul>
//             {errors.map((error, index) => (
//               <li key={index}>{error}</li>
//             ))}
//           </ul>
//         </div>
//       )}
      
//       {/* Dialog for success or failure messages */}
//       <Dialog open={openDialog} onClose={closeHandler}>
//         <DialogTitle>Notification</DialogTitle>
//         <DialogContent>{dialogMessage}</DialogContent>
//         <DialogActions>
//           <Button onClick={closeHandler}>Ok</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default Signup;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

import './signup.css';

function Signup() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // success, error, info, warning

  // Select individual state properties directly to avoid creating a new object
  const name = useSelector((state) => state.name);
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);
  const confirmPassword = useSelector((state) => state.confirmPassword);

  const dispatch = useDispatch();

  const validate = () => {
    let errorMessage = '';

    if (!name) {
      errorMessage = 'Name is required';
    } else if (!email) {
      errorMessage = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessage = 'Unsupported email format';
    } else if (!password) {
      errorMessage = 'Password is required';
    } else if (password !== confirmPassword) {
      errorMessage = 'Password confirmation failed (passwords do not match)';
    }

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

    // If validation fails, stop submission
    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:3005/Go2Code/quiz/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:name,
          email:email,
          password:password,
          confirmPassword:confirmPassword
        })
      });

      if (response.ok) {
        const result = await response.json();
        showSnackbar('Signup successful', 'success');
        console.log(result);
        // Redirect to login after successful signup
        setTimeout(() => {
          window.location.href = '/login';
        }, 4000); // Redirect after 2 seconds
      } else {
        showSnackbar('Signup failed', 'error');
      }
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, 'error');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="upperLayer">
      <div className="loginContainer">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="name">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => dispatch({ type: 'name', payload: e.target.value })}
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => dispatch({ type: 'email', payload: e.target.value })}
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => dispatch({ type: 'password', payload: e.target.value })}
            />
          </div>
          <div className="confirmPassword">
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => dispatch({ type: 'confirmPassword', payload: e.target.value })}
            />
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

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signup;
