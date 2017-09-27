import Color from "./Color.js";
import React from 'react';
import {rateColor, removeColor} from '../actions/actionsCreator';
import {sortFunction} from '../lib/array-helpers';
import '../stylesheets/ColorList.scss';

const ColorList = ({store}) => {
    const {colors, sort} = store.getState();
    const sortedColors = [...colors].sort(sortFunction(sort));
    return(
        <div className="color-list">
        {
            (sortedColors.length === 0) ?
            <p>No colors listed. Add a color </p> :
            sortedColors.map(color =>
            <Color key ={color.id} {...color} onRate={rating => store.dispatch(rateColor(color.id, rating))} onRemove={() => store.dispatch(removeColor(color.id))} />)
        }
        </div>
    );
}

export default ColorList;