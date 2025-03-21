
import React, { useEffect, useRef } from 'react';

interface StarsProps {
  count?: number;
}

const Stars: React.FC<StarsProps> = ({ count = 100 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      
      // Random size
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random twinkle animation
      const duration = Math.random() * 3 + 1;
      const delay = Math.random() * 5;
      star.style.setProperty('--twinkle-duration', `${duration}s`);
      star.style.setProperty('--twinkle-delay', `${delay}s`);
      
      // Random color (white to light blue)
      const hue = Math.random() * 20 + 200;
      const saturation = Math.random() * 50;
      const lightness = 80 + Math.random() * 20;
      star.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      container.appendChild(star);
    }
  }, [count]);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default Stars;
