import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeContextWrapper from './components/ThemeContextWrapper';

ReactDOM.render(
    <ThemeContextWrapper>
    <React.StrictMode>
        <App/>
    </React.StrictMode>
    </ThemeContextWrapper>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();