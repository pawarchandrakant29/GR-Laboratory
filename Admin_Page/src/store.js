import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'; // Explicitly named import
import rootReducer from './redux/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
