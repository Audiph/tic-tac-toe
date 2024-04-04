import React, { useEffect, useRef } from 'react';
import { SHAPES } from '../../lib/constants';
import { generateRandomColor } from '../../lib/utils';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const Confetti = () => {
  const { confetti } = useSelector((state: RootState) => state.util);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const generateConfetti = () => {
    const container = containerRef.current;
    if (container) {
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        const positionX = Math.random() * window.innerWidth;
        const positionY = Math.random() * window.innerHeight;
        const rotation = Math.random() * 360;
        const size = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
        confetti.style.left = `${positionX}px`;
        confetti.style.top = `${positionY}px`;
        confetti.style.transform = `rotate(${rotation}deg)`;
        confetti.className =
          'confetti ' + SHAPES[Math.floor(Math.random() * 3)];
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = generateRandomColor();
        container.appendChild(confetti);
        setTimeout(() => {
          container.removeChild(confetti);
        }, 4000);
      }
    }
  };

  useEffect(() => {
    if (confetti) {
      generateConfetti();
    }
  }, [confetti]);

  return (
    <div
      className="fixed w-full h-[calc(100vh-6rem)] overflow-hidden pointer-events-none z-50"
      ref={containerRef}
      id="confetti-container"
    ></div>
  );
};

export default Confetti;
