import Color from "./Color.js";
import React from 'react';
import {rateColor, removeColor} from '../actions/actionsCreator';
import {sortFunction} from '../lib/array-helpers';
import '../stylesheets/ColorList.scss';

const ColorList = ({colors=[], onRate=f=>f, onRemove=f=>f}) => {
    return(
        <div className="color-list">
        {
            (colors.length === 0) ?
            <p>No colors listed. Add a color </p> :
            colors.map(color =>
            <Color key ={color.id} {...color} onRate={rating => onRate(color.id, rating)} onRemove={() => onRemove(color.id)} />)
        }
        </div>
    );
}

export default ColorList;