import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import MapPage from "./pages/map";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import AdminPage from "./pages/admin";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<MapPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/admin' element={<PrivateRoute><AdminPage/></PrivateRoute>}/>
            </Routes>
        </Router>
    );
}

export default App;
