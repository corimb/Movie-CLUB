import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Scroll from './components/Scroll/Scroll';
// The Provider state will let us access the global store from anywhere in our application
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <Scroll showBelow={700} />
        <App />
    </Provider>,
    document.getElementById('root')
);