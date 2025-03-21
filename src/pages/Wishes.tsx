
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Stars from '@/components/Stars';
import GuessGame from '@/components/GuessGame';

const Wishes: React.FC = () => {
  useEffect(() => {
    // Reset scroll position
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      <Stars count={200} />
      <Navbar />
      
      <div className="pt-32 px-4 max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-space-darker/80 border border-space-purple/20 text-space-teal text-sm font-medium mb-4">
            Your Cosmic Messages
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-8 shimmer-text">
            Birthday Wishes
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300">
            Explore messages from the stars. Can you guess who sent each wish?
          </p>
        </header>
        
        <GuessGame />
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-space-darker to-transparent z-1"></div>
    </div>
  );
};

export default Wishes;
