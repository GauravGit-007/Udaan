import React, { useState, useEffect } from 'react';
import { Plane, TrendingUp } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const textArray = [
    'Airline Market Demand Tracker',
    'Real-Time Flight Analytics',
    'Aviation Data Intelligence',
    'Route Performance Monitor'
  ];

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % textArray.length;
      const fullText = textArray[current];

      setDisplayedText(
        isDeleting 
          ? fullText.substring(0, currentIndex - 1)
          : fullText.substring(0, currentIndex + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && currentIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }

      setCurrentIndex(isDeleting ? currentIndex - 1 : currentIndex + 1);
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, loopNum, typingSpeed, textArray]);

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 px-4 overflow-hidden min-h-[600px] flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 border border-white/20 rounded-full animate-pulse delay-2000"></div>
      </div>

      {/* Animated Clouds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-0 w-32 h-16 bg-white/5 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-0 w-24 h-12 bg-white/5 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-14 bg-white/5 rounded-full animate-float-fast"></div>
      </div>

      {/* Flying Airplane Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="airplane-container">
          <div className="airplane-path">
            <Plane className="w-8 h-8 text-white/60 airplane transform rotate-12" />
          </div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto text-center z-10">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute -inset-4 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-6 border border-white/20 hover:scale-110 transition-transform duration-500">
              <Plane className="w-16 h-16 text-white animate-bounce" />
            </div>
          </div>
        </div>
        
        {/* Animated Typing Title */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent min-h-[80px] md:min-h-[120px] flex items-center justify-center">
            <span className="inline-block">
              {displayedText}
              <span className="animate-blink text-blue-200">|</span>
            </span>
          </h1>
        </div>
        
        <div className="space-y-4 mb-10">
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed animate-fade-in-up">
            Visualize Live Airline Booking Trends
          </p>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto animate-fade-in-up delay-500">
            Advanced analytics for aviation professionals and business intelligence
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-1000">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <TrendingUp className="w-6 h-6 text-green-300 animate-pulse" />
            <span className="text-base font-medium">Real-time Analytics</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="relative">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-base font-medium">Live Data Feed</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <Plane className="w-6 h-6 text-blue-300 animate-bounce" />
            <span className="text-base font-medium">Global Coverage</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .airplane-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .airplane-path {
          position: absolute;
          animation: flyPath 15s infinite linear;
        }

        .airplane {
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
        }

        @keyframes flyPath {
          0% {
            top: 80%;
            left: -5%;
            transform: rotate(45deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          25% {
            top: 60%;
            left: 20%;
            transform: rotate(30deg) scale(1);
          }
          50% {
            top: 20%;
            left: 50%;
            transform: rotate(15deg) scale(1.1);
          }
          75% {
            top: 40%;
            left: 80%;
            transform: rotate(-15deg) scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 70%;
            left: 105%;
            transform: rotate(-30deg) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateX(-100px) translateY(0px); }
          50% { transform: translateX(100vw) translateY(-20px); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateX(100vw) translateY(0px); }
          50% { transform: translateX(-100px) translateY(-15px); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translateX(-100px) translateY(0px); }
          50% { transform: translateX(100vw) translateY(-10px); }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .animate-float-slow {
          animation: float-slow 20s infinite linear;
        }

        .animate-float-medium {
          animation: float-medium 15s infinite linear;
        }

        .animate-float-fast {
          animation: float-fast 12s infinite linear;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;