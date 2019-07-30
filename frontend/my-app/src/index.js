import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';



ReactDOM.render(
    <Provider store={configureStore()}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
   );