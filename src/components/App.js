import React, { Component } from 'react';
import { v4 } from 'uuid';
import AddColorForm from './AddColorForm.js';
import ColorList from './ColorList.js';
import '../stylesheets/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: []
    }
    this.rateColor = this.rateColor.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.addColor = this.addColor.bind(this);
  }

  rateColor(id, rating) {
    const colors = this.state.colors.map(color =>
      (color.id !== id) ? 
      color :
      {
        ...color,
        rating
      }
    );
    this.setState({colors});
  }

  removeColor(id) {
    const colors = this.state.colors.filter(color => color.id !== id);
    this.setState({colors});
  }

  addColor(title, color) {
    const colors = [
      ...this.state.colors,
      {
        id: v4(),
        title:title,
        color:color,
        rating: 0
      }
    ];
    this.setState({colors});
  }

  render() {
    return (
      <div className="App">
        <AddColorForm onNewColor={this.addColor} />
        <ColorList colors = {this.state.colors} onRate={this.rateColor} onRemove={this.removeColor} />
      </div>
    );
  }
}

export default App;
