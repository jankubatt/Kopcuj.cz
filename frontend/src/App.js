import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

import CreateHill from './components/CreateHill';
import ShowHillList from './components/ShowHillList';
import ShowHillDetails from './components/ShowHillDetails';
import UpdateHillInfo from './components/UpdateHillInfo';

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path='/' element={<ShowHillList/>}/>
                    <Route path='/create-hill' element={<CreateHill/>}/>
                    <Route path='/edit-hill/:id' element={<UpdateHillInfo/>}/>
                    <Route path='/show-hill/:id' element={<ShowHillDetails/>}/>
                </Routes>
            </Router>
        );
    }
}

export default App;