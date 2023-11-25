import React, {useState} from 'react'
import { BrowserRouter as Router, Routes ,Route, Link} from 'react-router-dom';
import Login from './components/Login'
import Main from './components/Main'

const App = () => {

  return(
    
    <Router>
      <Routes>
        <Route exact path="/auth" element={<Login />} />
        <Route exact path="/" element={<Main />} />
      </Routes>
    </Router>
    
  );
}

export default App; 