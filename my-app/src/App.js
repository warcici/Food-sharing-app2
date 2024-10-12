import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';
import PostSignup from './components/PostSignup';
import Navbar from './components/Navbar'; // Importation de la Navbar

const App = () => {
  return (
    <Router>
      <Navbar />  {/* Utilisation de la Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/post-signup" element={<PostSignup />} />
      </Routes>
    </Router>
  );
};

export default App;
