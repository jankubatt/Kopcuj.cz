import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import MapPage from "./pages/map";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<MapPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
