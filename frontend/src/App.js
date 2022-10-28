import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import MapPage from "./pages/map";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import AdminPage from "./pages/admin";
import HomePage from "./pages/home";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from './pages/forgot-password';
import ChangePassword from './pages/change-password';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/home' element={<HomePage/>}/>
                <Route exact path='/' element={<MapPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/forgot-password' element={<ForgotPassword/>}/>
                <Route path='/change-password' element={<ChangePassword/>}/>
                <Route path='/admin' element={<PrivateRoute><AdminPage/></PrivateRoute>}/>
            </Routes>
        </Router>
    );
}

export default App;
