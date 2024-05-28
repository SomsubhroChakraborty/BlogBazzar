import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Components/firebase';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function Login({ setIsAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("isAuth", "true");
        setIsAuth(true);
        navigate('/');
      })
      .catch((error) => {
        console.error("Error signing in with email and password: ", error);
      });
  };

  return (
    <div className='Loginpage'>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="off"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="off"
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/signin">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
