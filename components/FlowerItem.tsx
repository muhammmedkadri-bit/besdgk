
import React from 'react';
import { Flower } from '../types';

interface FlowerItemProps {
  flower: Flower;
  onClick: (flower: Flower) => void;
}

const FlowerItem: React.FC<FlowerItemProps> = ({ flower, onClick }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('flowerId', flower.id);
    // Create a custom drag image (the emoji itself)
    const span = document.createElement('span');
    span.innerText = flower.emoji;
    span.style.fontSize = '40px';
    document.body.appendChild(span);
    e.dataTransfer.setDragImage(span, 20, 20);
    setTimeout(() => document.body.removeChild(span), 0);
  };

  return (
    <button
      onClick={() => onClick(flower)}
      draggable
      onDragStart={handleDragStart}
      className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 border border-pink-50 cursor-grab active:cursor-grabbing"
    >
      <span className="text-4xl mb-1 filter drop-shadow-sm select-none">{flower.emoji}</span>
      <span className="text-[10px] text-pink-400 font-medium uppercase tracking-wider">{flower.name}</span>
    </button>
  );
};

export default FlowerItem;
