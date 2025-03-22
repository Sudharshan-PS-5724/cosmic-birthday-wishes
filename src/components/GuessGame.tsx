
import React, { useState, useEffect, useRef } from 'react';
import { Wish, useWishContext } from '@/context/WishContext';
import WishCard from './WishCard';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Trophy, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const GuessGame: React.FC = () => {
  const { wishes, currentWishIndex, setCurrentWishIndex } = useWishContext();
  const [isFinished, setIsFinished] = useState(false);
  const [showComet, setShowComet] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [gameStats, setGameStats] = useState({
    totalWishes: wishes.length,
    guessedCorrectly: 0,
    skipped: 0
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Initialize audio player
    const audio = new Audio('/coward.mp3');
    audio.volume = 0.4;
    audio.loop = true;
    audioRef.current = audio;
    
    // Add event listener to check when audio is loaded
    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
      audio.play().catch(err => console.log('Audio autoplay prevented:', err));
    });
    
    // Add error listener
    audio.addEventListener('error', (e) => {
      console.log('Audio error:', e);
    });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);
  
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
              <div className="p-4 rounded-lg bg-galaxy-dark/70 border border-galaxy-purple/20">
                <p className="text-xl text-galaxy-blue font-bold">{gameStats.totalWishes}</p>
                <p className="text-sm text-gray-400">Total Wishes</p>
              </div>
              <div className="p-4 rounded-lg bg-galaxy-dark/70 border border-galaxy-purple/20">
                <p className="text-xl text-green-400 font-bold">{gameStats.guessedCorrectly}</p>
                <p className="text-sm text-gray-400">Correct Guesses</p>
              </div>
              <div className="p-4 rounded-lg bg-galaxy-dark/70 border border-galaxy-purple/20">
                <p className="text-xl text-yellow-400 font-bold">{gameStats.skipped}</p>
                <p className="text-sm text-gray-400">Skipped</p>
              </div>
            </div>
            
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Thank you for exploring all your cosmic birthday messages. May your year ahead be filled with wonder and joy!
            </p>
            <Link to="/">
              <Button className="bg-galaxy-blue hover:bg-galaxy-blue/80 text-black font-medium px-6 py-5 rounded-full">
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
              className="w-32 h-2 bg-galaxy-dark/50" 
            />
          </div>
          
          {showComet && (
            <div 
              className="absolute top-0 right-0 w-96 h-96 pointer-events-none animate-comet"
              style={{ zIndex: 5 }}
            >
              <div className="relative w-full h-full">
                <div 
                  className="absolute top-10 right-10 w-8 h-8 rounded-full bg-galaxy-blue"
                  style={{ 
                    boxShadow: '0 0 30px 10px rgba(138,180,248,0.6), 0 0 60px 20px rgba(138,180,248,0.4)'
                  }}
                ></div>
                
                {/* Comet trail */}
                <div className="absolute top-12 right-12 w-40 h-2 bg-gradient-to-l from-galaxy-blue via-galaxy-blue/50 to-transparent transform rotate-45"></div>
                
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
              key={currentWish.id} 
              wish={currentWish} 
              onNext={handleNext}
            />
          )}
        </>
      )}
      
      {/* Sound control button */}
      <button 
        onClick={() => {
          if (audioRef.current) {
            if (audioRef.current.paused) {
              audioRef.current.play().catch(e => console.log("Play error:", e));
            } else {
              audioRef.current.pause();
            }
          }
        }}
        className="fixed bottom-4 right-4 bg-galaxy-dark/70 p-2 rounded-full border border-galaxy-purple/30 text-galaxy-blue hover:text-galaxy-pink transition-colors z-20"
        title={audioRef.current?.paused ? "Play Music" : "Pause Music"}
      >
        {audioRef.current?.paused ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
        )}
      </button>
    </div>
  );
};

export default GuessGame;
