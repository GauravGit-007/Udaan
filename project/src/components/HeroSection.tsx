import React, { useState, useEffect } from 'react';
import { Plane, TrendingUp, Sparkles, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const textArray = [
    'Udaan: Aviation Intelligence',
    'Real-Time Flight Analytics',
    'Market Demand Insights',
    'Route Performance AI'
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
  }, [currentIndex, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="relative min-h-[500px] flex items-center justify-center overflow-hidden py-24">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-sm font-bold mb-8 uppercase tracking-widest"
        >
          <Sparkles className="w-4 h-4" />
          Powered by Udaan AI
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
          {displayedText}
          <span className="animate-pulse text-blue-600">|</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          The next generation of aviation analytics. Monitor global demand,
          track route performance, and stay ahead with AI-powered market insights.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/50 backdrop-blur-md border border-white shadow-lg shadow-blue-100/50">
            <Globe className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-gray-700">Global Coverage</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/50 backdrop-blur-md border border-white shadow-lg shadow-purple-100/50">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <span className="font-semibold text-gray-700">Live Analytics</span>
          </div>
        </div>
      </div>

      {/* Flying Plane Ornament */}
      <div className="absolute top-20 right-10 opacity-20 transform rotate-12 -z-10">
        <Plane className="w-64 h-64 text-blue-600" />
      </div>
    </div>
  );
};

export default HeroSection;