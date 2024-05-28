// src/Components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Components/firebase';
import './Navbar.css';

function Navbar({ isAuth, setIsAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setIsAuth(false);
        navigate('/login');
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <div>
      <nav>
        <h2>BlogBazzar</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          {isAuth ? (
            <>
              <li><Link to="/createpost">Create Post</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
