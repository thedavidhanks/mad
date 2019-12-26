import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MenuBar from './components/MenuBar.js'
import TravelMap from './components/Map.js';
import Home from './components/Home.js';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
        <div>
            <MenuBar/>
            <Route path='/' exact component={Home} />
            <Route path='/whereintheworld' component={TravelMap} />
            <Route path='/wherearethey' component={TravelMap} />
        </div>
    </Router>
  );
}

export default App;
