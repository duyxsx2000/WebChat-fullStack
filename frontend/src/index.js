import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Route,Switch,Routes} from 'react-router-dom';
import  store  from './appp/store'
import { Provider } from 'react-redux';


const xx = 0;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    
    <Provider store={store}>
     
   <App></App>

    </Provider>
    
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
