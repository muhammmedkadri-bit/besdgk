
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const FloatingElements = ({ type }: { type: 'party' | 'petals' }) => {
  const partyItems = ['🎂', '🎈', '🎉', '🎁', '✨', '💖', '⭐'];
  const petalsItems = ['🌸', '💮', '🏵️', '🌺', '🍃', '✨'];
  const items = type === 'party' ? partyItems : petalsItems;
  
  const [elements, setElements] = useState<{id: number, char: string, left: number, delay: number, size: number, duration: number}[]>([]);

  useEffect(() => {
    const newElements = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      char: items[Math.floor(Math.random() * items.length)],
      left: Math.random() * 100,
      delay: Math.random() * 10,
      size: 15 + Math.random() * 35,
      duration: 8 + Math.random() * 7
    }));
    setElements(newElements);
  }, []);

  return (
    <>
      {elements.map(el => (
        <span 
          key={el.id} 
          className="emoji-float" 
          style={{ 
            left: `${el.left}%`, 
            animationDelay: `${el.delay}s`, 
            fontSize: `${el.size}px`,
            animationDuration: `${el.duration}s`
          }}
        >
          {el.char}
        </span>
      ))}
    </>
  );
};

const Section1 = () => {
  return (
    <div className="snap-section">
      <FloatingElements type="party" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ margin: "-10%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 bg-white/40 backdrop-blur-xl p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60 text-center mx-6"
      >
        <motion.h2 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="font-cursive text-6xl text-pink-500 mb-6 drop-shadow-sm"
        >
          Mutlu Yıllar!
        </motion.h2>
        <p className="text-xl text-pink-400 font-semibold italic opacity-90">
          İyi ki doğdun, iyi ki varsın benim canım ❤️
        </p>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 text-pink-300 opacity-60"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>
      </motion.div>
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="snap-section">
      <FloatingElements type="petals" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ margin: "-10%" }}
        transition={{ duration: 1.5 }}
        className="z-10 bg-white/50 backdrop-blur-2xl p-8 sm:p-12 rounded-[3.5rem] shadow-2xl border-l-8 border-pink-400 text-center mx-6 sm:mx-8 max-w-2xl"
      >
        <p className="font-cursive text-2xl sm:text-4xl text-pink-600 leading-[1.6] sm:leading-relaxed">
          Yeni yaşın hayatına yeni güzellikler, ailenle ve sevdiklerinle sağlık, huzur, mutluluklar ve ömrünün geri kalanında en güzel anları yaşamanın ilk ve en büyük adımı olsun 🥳
        </p>
      </motion.div>
    </div>
  );
};

const Section3 = () => {
  const [showLink, setShowLink] = useState(false);
  const musicUrl = "https://youtu.be/AYnojfDGgwI?si=ozc8XMz4soNc2nqX";

  useEffect(() => {
    const timer = setTimeout(() => setShowLink(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="snap-section">
      <motion.div 
        initial={{ y: 100, opacity: 0, scale: 0.8 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ margin: "-10%" }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
        className="relative w-72 h-72 sm:w-80 sm:h-80 mb-10 z-10"
      >
        <img 
          src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop" 
          alt="Lüks Buket"
          className="w-full h-full object-cover rounded-full shadow-[0_20px_60px_rgba(236,72,153,0.4)] border-[12px] border-white/80"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -bottom-6 -right-6 bg-pink-500 text-white p-5 rounded-full shadow-2xl transform text-2xl"
        >
           💐
        </motion.div>
      </motion.div>

      <div className="text-center px-10 z-20">
        <div className="inline-block max-w-full">
          <motion.h1 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "-10%" }}
            className="font-cursive text-5xl sm:text-6xl text-pink-600 typewriter leading-[1.6] py-3"
          >
            İyi ki doğdun.
          </motion.h1>
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-10%" }}
          transition={{ delay: 1, duration: 1 }}
          className="text-pink-400 text-md sm:text-lg mt-6 font-bold tracking-[0.4em] uppercase opacity-80"
        >
          Nice mutlu yaşlara Besna
        </motion.p>
      </div>

      <AnimatePresence>
        {showLink && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-14 z-30"
          >
            <a 
              href={musicUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full font-bold shadow-[0_10px_30px_rgba(236,72,153,0.3)] hover:scale-105 transition-all duration-300"
            >
              <span className="text-xl">🎵</span>
              <span className="text-lg">Bu şarkı senin için</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="snap-container">
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
};

export default App;
