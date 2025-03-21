
import React, { useState, useEffect } from 'react';
import { Wish, useWishContext } from '@/context/WishContext';
import WishCard from './WishCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GuessGame: React.FC = () => {
  const { wishes, currentWishIndex, setCurrentWishIndex } = useWishContext();
  const [isFinished, setIsFinished] = useState(false);
  const [showComet, setShowComet] = useState(false);
  
  useEffect(() => {
    // Show comet animation for each new wish
    setShowComet(false);
    setTimeout(() => {
      setShowComet(true);
    }, 300);
  }, [currentWishIndex]);
  
  const handleNext = () => {
    if (currentWishIndex >= wishes.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentWishIndex(prev => prev + 1);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {isFinished ? (
        <div className="text-center animate-fade-in-up">
          <h2 className="text-4xl font-display font-bold mb-6 shimmer-text">
            To Many More Virtual Wishes
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Thank you for exploring all your cosmic birthday messages. May your year ahead be filled with wonder and joy!
          </p>
          <Link to="/">
            <Button className="bg-space-teal hover:bg-space-teal/80 text-black font-medium px-6 py-5 rounded-full">
              Return to Stars
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {showComet && (
            <div 
              className="absolute top-0 right-0 w-96 h-96 pointer-events-none animate-comet"
              style={{ zIndex: 5 }}
            >
              <div className="relative w-full h-full">
                <div 
                  className="absolute top-10 right-10 w-8 h-8 rounded-full bg-space-teal"
                  style={{ 
                    boxShadow: '0 0 30px 10px rgba(62,252,252,0.6), 0 0 60px 20px rgba(62,252,252,0.4)'
                  }}
                ></div>
                
                {/* Comet trail */}
                <div className="absolute top-12 right-12 w-40 h-2 bg-gradient-to-l from-space-teal via-space-teal/50 to-transparent transform rotate-45"></div>
                
                {/* Particles */}
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute rounded-full bg-white animate-twinkle"
                    style={{
                      width: `${Math.random() * 3 + 1}px`,
                      height: `${Math.random() * 3 + 1}px`,
                      top: `${10 + Math.random() * 10}px`,
                      right: `${10 + Math.random() * 40}px`,
                      opacity: Math.random() * 0.7 + 0.3,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}
          
          <WishCard 
            wish={wishes[currentWishIndex]} 
            onNext={handleNext}
          />
          
          <div className="flex justify-between items-center mt-8">
            <div className="text-gray-400 text-sm">
              Wish {currentWishIndex + 1} of {wishes.length}
            </div>
            
            {currentWishIndex < wishes.length - 1 && (
              <Button
                variant="ghost"
                onClick={handleNext}
                className="text-space-teal hover:text-space-teal/80 group"
              >
                Next wish
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GuessGame;
