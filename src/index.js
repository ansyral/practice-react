import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import storeFactory from './store/storeFactory';

window.React = React;

const store = storeFactory(false, window.__INITIAL_STATE__);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-container'));

