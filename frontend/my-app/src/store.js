import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducres/rootReducers.js';
import {compose } from 'redux';

export default function configureStore(initialState={}) {
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 return createStore(
   rootReducer,
   initialState,
   composeEnhancers(applyMiddleware(thunk, logger))
 );
}