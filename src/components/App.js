import React, { Component } from 'react';
import { v4 } from 'uuid';
import AddColorForm from './AddColorForm.js';
import ColorList from './ColorList.js';
import SortMenu from './SortMenu.js';
import '../stylesheets/App.scss';

const App = ({ store }) =>
<div className="app">
    <SortMenu store={store} />
    <AddColorForm store={store} />
    <ColorList store={store} />
</div>

export default App;
