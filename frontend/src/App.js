import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

import Register from "./pages/register";
import Login from "./pages/login";
import Map from "./pages/map";

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path='/' element={<Map/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </Router>
        );
    }
}

export default App;