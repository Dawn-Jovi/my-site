import React from 'react';
import { Link } from 'react-router-dom';
import './card.css'


function Card({ image, title, text, link, buttonText }) {
    return (
        <div className='card'>
            <img src={image} className='card-img'  alt=""/>
            <h3 className='card-title'>{title}</h3>
            <p className='card-text'>{text}</p>
            <Link to={link} className='card-button'>
                <a className='card-button-text'>{buttonText}</a>
            </Link>
        </div>
    
    );
}

export default Card;