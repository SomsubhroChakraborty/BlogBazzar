import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../Components/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import './Signin.css';

function Signin({ setIsAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in successfully!");

      // Update user profile with first name and last name
      await updateProfile(user, {
        displayName: `${fname} ${lname}`
      });

      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname
      });

      console.log("User data saved to Firestore");
      localStorage.setItem("isAuth", "true");
      setIsAuth(true);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="off"
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="off"
      />
      <input
        type="text"
        placeholder="Enter Firstname"
        value={fname}
        onChange={(e) => setFname(e.target.value)}
        autoComplete="off"
      />
      <input
        type="text"
        placeholder="Enter Lastname"
        value={lname}
        onChange={(e) => setLname(e.target.value)}
        autoComplete="off"
      />
      <button onClick={handleRegister}>Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}

export default Signin;
