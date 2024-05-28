import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signin from './pages/Signin';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import './App.css';
import { auth } from './Components/firebase';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuth(true);
        localStorage.setItem("isAuth", "true");
      } else {
        setIsAuth(false);
        localStorage.setItem("isAuth", "false");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/signin" element={<Signin setIsAuth={setIsAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
