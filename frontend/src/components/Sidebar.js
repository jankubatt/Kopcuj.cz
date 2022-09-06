import React from 'react';
import '../App.css';

const Sidebar = (props) => {
    const hill = props.hill;

    return (
        <>{props.hill && <div className={'sidebar'}>
            <div className={'hill'}>
                {hill.name}<br/>
                {hill.elevation}<br/>
                {hill.lat}<br/>
                {hill.lon}<br/>
                {hill.prominence}<br/>
                {hill.isolation}<br/>
                {hill.material}<br/>
                {hill.basin}<br/>
                {hill.district}<br/>
                {hill.location}<br/>
            </div>
            <div className={'bottom'}>
                <div className={'button'}><a href="">Settings</a></div>
                <div className={'button'}><a href="">Profile</a></div>
                <div className={'button'}><a href="">Collapse</a></div>
            </div>
        </div>}</>
    )
};

export default Sidebar;