import React from 'react';
// import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import ReactDOM from 'react-dom';
import './vendor/index.css';
import './vendor/App.css';
import App from './App';
import store from './utility/auth/store'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

