
import React, { useState, useEffect } from 'react';
import { Wish, useWishContext } from '@/context/WishContext';
import WishCard from './WishCard';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, Trophy, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const GuessGame: React.FC = () => {
  const { wishes, currentWishIndex, setCurrentWishIndex } = useWishContext();
  const [isFinished, setIsFinished] = useState(false);
  const [showComet, setShowComet] = useState(false);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [gameStats, setGameStats] = useState({
    totalWishes: wishes.length,
    guessedCorrectly: 0,
    skipped: 0
  });
  
  useEffect(() => {
    // Show comet animation for each new wish
    setShowComet(false);
    setTimeout(() => {
      setShowComet(true);
    }, 300);
  }, [currentWishIndex]);
  
  useEffect(() => {
    // Count correctly guessed wishes
    const correctlyGuessed = wishes.filter(wish => wish.guessed && wish.guessedCorrectly).length;
    const skipped = wishes.filter(wish => wish.guessed && !wish.guessedCorrectly).length;
    
    setGameStats({
      totalWishes: wishes.length,
      guessedCorrectly: correctlyGuessed,
      skipped: skipped
    });
  }, [wishes]);
  
  const handleNext = () => {
    if (currentWishIndex >= wishes.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentWishIndex(prev => prev + 1);
    }
  };
  
  const calculateProgress = () => {
    return Math.round(((currentWishIndex + 1) / wishes.length) * 100);
  };
  
  // Only get the current wish for display
  const currentWish = wishes[currentWishIndex];
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {isFinished ? (
        <div className="text-center animate-fade-in-up">
          <div className="mb-8 p-6 glass-card">
            <Trophy className="h-10 w-10 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-4xl font-display font-bold mb-6 shimmer-text">
              You Completed All Wishes!
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-space-darker/70 border border-space-purple/20">
                <p className="text-xl text-space-teal font-bold">{gameStats.totalWishes}</p>
                <p className="text-sm text-gray-400">Total Wishes</p>
              </div>
              <div className="p-4 rounded-lg bg-space-darker/70 border border-space-purple/20">
                <p className="text-xl text-green-400 font-bold">{gameStats.guessedCorrectly}</p>
                <p className="text-sm text-gray-400">Correct Guesses</p>
              </div>
              <div className="p-4 rounded-lg bg-space-darker/70 border border-space-purple/20">
                <p className="text-xl text-yellow-400 font-bold">{gameStats.skipped}</p>
                <p className="text-sm text-gray-400">Skipped</p>
              </div>
            </div>
            
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Thank you for exploring all your cosmic birthday messages. May your year ahead be filled with wonder and joy!
            </p>
            <Link to="/">
              <Button className="bg-space-teal hover:bg-space-teal/80 text-black font-medium px-6 py-5 rounded-full">
                Return to Stars
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm font-medium text-gray-400">
              Wish {currentWishIndex + 1} of {wishes.length}
            </div>
            <Progress 
              value={calculateProgress()} 
              className="w-32 h-2 bg-space-darker/50" 
            />
          </div>
          
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
          
          {currentWish && (
            <WishCard 
              wish={currentWish} 
              onNext={handleNext}
            />
          )}
          
          <div className="flex justify-between items-center mt-8">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-gray-400 text-sm">Guess who sent each wish!</span>
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
