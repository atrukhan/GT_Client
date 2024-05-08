import React, {useState} from 'react'
import { BrowserRouter as Router, Routes ,Route, Link} from 'react-router-dom';
import './App.css'
import LoginPage from './components/LoginPage'
import MainPage from './components/MainPage'

const App = () => {

  return(
    
    <Router>
      <Routes>
        <Route exact path="/auth" element={<LoginPage />} />
        <Route exact path="/" element={<MainPage />} />
      </Routes>
    </Router>
    
  );
}

export default App; 