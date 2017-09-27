import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import storeFactory from './store/storeFactory';

window.React = React;

const store = storeFactory();
const render = () =>
    ReactDOM.render(<App store={store} />, document.getElementById('react-container'));
store.subscribe(render)
render()
