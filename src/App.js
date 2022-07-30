import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Navbar'
import Home from './Home'
import Algo from './Algo'
import "./home.css"

function App() {

  return (
      <Router>
          <Navbar/>
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/algo" element= {<Algo /> } />
          </Routes>
      </Router>

  );
}


export default App