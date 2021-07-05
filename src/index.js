import React from 'react';

import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducers/auth'
import thunk from 'redux-thunk';
const options = {
    timeout: 5000,

  };
const rootReducer = combineReducers({
    auth:authReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

const app=(
    <Provider store={store}>
    <BrowserRouter>
    <AlertProvider template={AlertTemplate}  {...options}>
    <App/>
    </AlertProvider>
    </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));


serviceWorker.unregister();

