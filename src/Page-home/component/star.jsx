import { useEffect } from 'react';
import './star.css';

function Stars() {
  const handleMouseMove = (e) => {
    const star = document.createElement('div');
    star.className = 'star';
    
    star.style.left = e.clientX + 'px';
    star.style.top = e.clientY + 'px';
    star.style.width = star.style.height = 
      Math.random() * 8 + 3 + 'px';
    
    document.body.appendChild(star);
    
    setTimeout(() => {
      star.remove();
    }, 1000);
  };

  const createRandomStars = () => {
    const star = document.createElement('div');
    star.className = 'star';
    
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.width = star.style.height = 
      Math.random() * 5 + 2 + 'px';
    
    document.body.appendChild(star);
    
    setTimeout(() => star.remove(), 2000);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    const starInterval = setInterval(createRandomStars, 500);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(starInterval);
    };
  }, []);

  return null;
}

export default Stars;