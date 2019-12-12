import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Menu from './components/Menu.js'
import TravelMap from './components/Map.js';
import Home from './components/Home.js';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
        <div>
            <Menu/>
            <div className="main">
                <Route path='/' exact component={Home} />
                <Route path='/wherearethey' component={TravelMap} />
            </div>
        </div>
    </Router>
  );
}

export default App;
