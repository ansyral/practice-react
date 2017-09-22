import StarRating from './StarRating.js';
import React from 'react';
import '../stylesheets/Color.scss';

const Color = ({title, color, rating=0,onRemove= f=>f, onRate = f=>f}) => {
    return (
        <section className="color">
            <h1>{title}</h1>
            <button onClick={onRemove}>X</button>
            <div className="color" style={{backgroundColor: color}} />
            <div>
                 <StarRating starsSelected={rating} onRate={onRate} />
            </div>
        </section>
    );
}

export default Color;