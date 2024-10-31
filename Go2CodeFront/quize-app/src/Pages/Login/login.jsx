import React, { useState ,useEffect} from "react";
import { Link,useNavigate} from "react-router-dom";
import { Snackbar,Alert } from "@mui/material";
import { blue } from "@mui/material/colors";

function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const navigate=useNavigate()
  const [snackbarMessage,setSnackbarMessage]=useState('');
  const [severity,setSeverity]=useState('success');
  const [snackbarOpen,setSnackbarOpen]=useState(false);

  const [isLoading,setIsLoading]=useState(false);

  useEffect(()=>{
    const token=localStorage.getItem('token');
    console.log('localstorage token',token)
    if(token){
      setIsLoading(true);
      buildSnackbar('Authonticating...','message');
      setTimeout(()=>{
        navigate('/dashboard');
      },2000);
    }
  },[])

  const validate=()=>{
    let error='';
      if(!email || !password){error='fill all the fields first' }
      else if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))){
       error='invalid email address';
      }
      if(error){
        buildSnackbar(error,'error')
        return false;
      }
      return true;

  }

  const buildSnackbar=(message,severity)=>{
    setSnackbarMessage(message);
    setSeverity(severity);
    setSnackbarOpen(true);
  }
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      const response = await fetch('http://localhost:3005/Go2Code/quiz/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });
      
      // Parse response as JSON
      const data = await response.json();
      
      // Check for errors in response
      if (!response.ok) {
        buildSnackbar('Unable to login: ' );
        return;
      }
  
      // If login is successful
      window.localStorage.setItem('token', data.token);
      console.log('token ',data.token)
      buildSnackbar('Login successful!', 'success');
      
      // Optionally redirect to the dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 5000);
  
    } catch (error) {
      console.error('Error:', error);
      buildSnackbar('Error: ' + error.message, 'error');
    }
  };
  
  const closeSnackbar=()=>{
    setSnackbarOpen(false);
  }
  return(
    <div className="loginContainer">
      <h3>Login</h3>
      <form onSubmit={submitHandler}>
        <div className="email">
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" required  value={email} onChange={(e)=>{
            setEmail(e.target.value);
          }}/>
        </div>
        <div className="password">
          <label htmlFor="password">Password: </label>
          <input type="password" value={password} onChange={(e)=>{
            setPassword(e.target.value);
          }} />
        </div>
        <div className="submit">
          <input type="submit" />
        </div>
        <div className="message">
          <p>if you haven't an account <Link to='/signup'>signup</Link></p>
        </div>
      </form>

      {/* snackbar part */}
      <Snackbar open={snackbarOpen} onClose={closeSnackbar}  autoHideDuration={3500} anchorOrigin={{vertical:'top',horizontal:'right'}}>
        <Alert onClose={closeSnackbar} severity={severity} sx={{width:'max-content',backgroundColor:'rgb(230,240,250)',color:'black'}} >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}
export default Login;