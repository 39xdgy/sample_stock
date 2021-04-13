import '../App.css';
import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';


import Home from './home'
import Search_page from './search_page'



function App() {
  return (
    <Router>
    
      <Route exact path = '/' component = {Home} />
      <Route path ='/page' component = {Search_page} />
    
    </Router>
  );

}

export default App;
