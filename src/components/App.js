import React, { Component } from 'react';
import { v4 } from 'uuid';
import { Menu, NewColor, Colors } from '../containers/Container';
import '../stylesheets/App.scss';

const App = ({ store }) =>
<div className="app">
    <Menu />
    <NewColor />
    <Colors />
</div>

export default App;
