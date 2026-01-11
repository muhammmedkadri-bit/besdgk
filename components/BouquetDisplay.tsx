
import React, { useState, useRef } from 'react';
import { PlacedFlower } from '../types';
import { FLOWERS } from '../constants';

interface BouquetDisplayProps {
  flowers: PlacedFlower[];
  paperColor: string;
  ribbonColor: string;
  onRemoveFlower: (instanceId: string) => void;
  onUpdateFlower: (instanceId: string, updates: Partial<PlacedFlower>) => void;
  onDropFlower: (flowerId: string, x: number, y: number) => void;
  selectedId: string | null;
  onSelect: (instanceId: string | null) => void;
}

const BouquetDisplay: React.FC<BouquetDisplayProps> = ({ 
  flowers, 
  paperColor, 
  ribbonColor, 
  onDropFlower,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => setIsOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const flowerId = e.dataTransfer.getData('flowerId');
    if (flowerId && containerRef.current) {
      // In layered mode, drop just triggers the next layer add
      onDropFlower(flowerId, 50, 50);
    }
  };

  // Sort flowers: Outer layers (higher Y or specific layer logic) usually go behind.
  // In our ring logic, Layer 1 (innermost) should be rendered last to be on top.
  // The 'flowers' array already contains instanceIds with layer info or we can sort by distance to center
  const sortedFlowers = [...flowers].sort((a, b) => {
    // Basic layering: Higher Y (lower on screen) flowers can be front, 
    // but Layer index is more reliable for our ring design.
    const aLayer = parseInt(a.instanceId.split('-')[1]);
    const bLayer = parseInt(b.instanceId.split('-')[1]);
    return bLayer - aLayer; // Higher layer number (outer) rendered first (bottom)
  });

  return (
    <div 
      ref={containerRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full max-w-[340px] aspect-[3/4] mx-auto overflow-hidden rounded-3xl transition-all duration-300 bg-gradient-to-b from-pink-50 to-white shadow-2xl border-4 ${isOver ? 'border-pink-300 scale-[1.02]' : 'border-white'} flex items-center justify-center`}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl rotate-12">✨</div>
        <div className="absolute bottom-10 right-10 text-4xl -rotate-12">💖</div>
      </div>

      {/* Wrapping Paper Base */}
      <div 
        className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[95%] h-[60%] z-10 transition-colors duration-500"
        style={{
          backgroundColor: paperColor,
          clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
          boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.1)'
        }}
      >
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
      </div>

      {/* Flowers Layer */}
      <div className="absolute inset-0 z-20">
        {sortedFlowers.map((f) => {
          const flowerData = FLOWERS.find(fd => fd.id === f.flowerId);
          
          return (
            <div
              key={f.instanceId}
              className="absolute pointer-events-none"
              style={{
                left: `${f.x}%`,
                top: `${f.y}%`,
                transform: `translate(-50%, -50%) rotate(${f.rotation}deg) scale(${f.scale})`,
              }}
            >
              <span className="text-4xl sm:text-5xl select-none block drop-shadow-md">
                {flowerData?.emoji}
              </span>
            </div>
          );
        })}
      </div>

      {/* Ribbon */}
      <div 
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[45%] h-10 z-30 flex items-center justify-center transition-colors duration-500"
        style={{ backgroundColor: ribbonColor, borderRadius: '4px' }}
      >
        <div className="absolute -top-5 -left-5 text-3xl" style={{ color: ribbonColor }}>🎀</div>
        <div className="absolute -top-5 -right-5 text-3xl scale-x-[-1]" style={{ color: ribbonColor }}>🎀</div>
      </div>

      {/* Birthday Card Tag */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 transform rotate-[-3deg] transition-all hover:rotate-0 hover:scale-110">
        <div className="bg-white px-5 py-4 shadow-2xl border-l-4 border-pink-500 rounded-sm w-48 text-center pointer-events-none">
          <p className="font-cursive text-2xl text-pink-600 leading-tight">İyi ki doğdun!</p>
          <div className="h-[1px] bg-pink-100 w-full my-2"></div>
          <p className="text-[10px] text-pink-300 font-bold uppercase tracking-widest">Katman Katman Sevgiyle</p>
        </div>
      </div>
      
      {flowers.length < 21 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none px-10 text-center">
          <div className="animate-bounce text-4xl mb-4">💐</div>
          <p className="text-pink-400 font-bold text-lg mb-2">Buketin Hazırlanıyor!</p>
          <p className="text-pink-300 text-xs">Çiçekleri seçerek katmanları doldurmaya başla.</p>
        </div>
      )}
    </div>
  );
};

export default BouquetDisplay;
