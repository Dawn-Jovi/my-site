import React from 'react';
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import './floatingText.css'

const FloatingText = ({ text }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return createPortal(
    <span 
      className="floating-text"
      style={{
        position:'fixed',
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
        fontSize: `${Math.random() * 20 + 16}px`,
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.5s ease-in-out',
        pointerEvents: 'none'
      }}
    >
      {text}
    </span>,
    document.body
  );
};


export default FloatingText;