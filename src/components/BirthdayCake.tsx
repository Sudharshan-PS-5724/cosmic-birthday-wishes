
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const BirthdayCake: React.FC = () => {
  const cakeRef = useRef<HTMLDivElement>(null);
  const flameRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    // Add flame animation
    flameRefs.current.forEach((flame) => {
      if (flame) {
        flame.style.animation = `pulse-soft ${Math.random() * 0.5 + 1.5}s ease-in-out infinite`;
      }
    });
    
    // Add subtle cake floating animation
    if (cakeRef.current) {
      setTimeout(() => {
        if (cakeRef.current) {
          cakeRef.current.classList.add('animate-float');
        }
      }, 500);
    }
  }, []);
  
  return (
    <div className="relative w-64 h-64 mx-auto perspective-800 mt-10" ref={cakeRef}>
      {/* Cake base - bottom layer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-16 bg-space-pink rounded-lg shadow-lg transform-3d rotate-x-10 z-10">
        <div className="absolute inset-0 bg-pink-500 rounded-lg opacity-50"></div>
        <div className="absolute inset-0 rounded-lg shadow-inner" style={{ boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.3)' }}></div>
      </div>
      
      {/* Middle layer */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-14 bg-space-purple rounded-lg shadow-lg transform-3d rotate-x-10 z-20">
        <div className="absolute inset-0 bg-purple-500 rounded-lg opacity-50"></div>
        <div className="absolute inset-0 rounded-lg shadow-inner" style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}></div>
      </div>
      
      {/* Top layer */}
      <div className="absolute bottom-30 left-1/2 -translate-x-1/2 w-40 h-12 bg-space-blue rounded-lg shadow-lg transform-3d rotate-x-10 z-30">
        <div className="absolute inset-0 bg-blue-500 rounded-lg opacity-50"></div>
        <div className="absolute inset-0 rounded-lg shadow-inner" style={{ boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.3)' }}></div>
      </div>
      
      {/* Candles */}
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className="absolute z-40"
          style={{
            bottom: '42px',
            left: `${50 + (i - 2) * 15}%`,
            transform: 'translate(-50%, 0) rotateX(10deg)'
          }}
        >
          <div className="w-2 h-10 bg-white rounded-sm transform-3d"></div>
          <div 
            ref={el => flameRefs.current[i] = el}
            className={cn(
              "w-4 h-6 bg-yellow-500 rounded-full absolute -top-6 left-1/2 -translate-x-1/2 z-50",
              "before:content-[''] before:absolute before:inset-0 before:bg-orange-500 before:rounded-full before:filter before:blur-sm",
              "after:content-[''] after:absolute after:inset-[-4px] after:bg-yellow-300/30 after:rounded-full after:filter after:blur-md"
            )}
          ></div>
        </div>
      ))}
      
      {/* Cake stand */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 h-2 bg-gray-300 rounded-full opacity-80 z-0 transform-3d"></div>
    </div>
  );
};

export default BirthdayCake;
