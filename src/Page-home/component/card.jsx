import React from 'react';
import { Link } from 'react-router-dom';
import './card.css'


function Card({ icon, title, text, link, buttonText }) {
    return (
        <div className='card'>
            <img className='card-img' src={icon} alt=""/>
            <h3 className='card-title'>{title}</h3>
            <p className='card-text'>{text}</p>
            <Link to = {link} className='card-button'>{buttonText}</Link>
        </div>
    
    );
}

export default Card;