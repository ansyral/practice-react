import React, { Component } from 'react';
import {addColor} from '../actions/actionsCreator';
import '../stylesheets/AddColorForm.scss';

class AddColorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', color: '#000000'};
        this.submit = this.submit.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleText = this.handleText.bind(this);
    }

    submit(e) {
        e.preventDefault();
        this.props.store.dispatch(addColor(this.state.title, this.state.color));
    }
    handleText(e) {
        this.setState({title: e.target.value});
    }
    handleColor(e) {
        this.setState({color: e.target.value});
    }
    render() {
        return (
            <form onSubmit={this.submit}>
            <input type = 'text' value = {this.state.title} onChange={this.handleText} required/>
            <input type= 'color' value = {this.state.color} onChange={this.handleColor} required/>
            <button>ADD</button>
            </form>
        );
    }
    
}
export default AddColorForm;