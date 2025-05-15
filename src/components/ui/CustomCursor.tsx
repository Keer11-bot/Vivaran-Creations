import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      // Use pageX and pageY instead of clientX and clientY to account for scrolling
      setMousePosition({
        x: e.pageX,
        y: e.pageY,
      });
    };
    
    const mouseDown = () => setCursorVariant('click');
    const mouseUp = () => setCursorVariant('default');
    
    const handleMouseEnterLink = () => setCursorVariant('hover');
    const handleMouseLeaveLink = () => setCursorVariant('default');
    
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    
    // Add event listeners to all links and buttons
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnterLink);
      link.addEventListener('mouseleave', handleMouseLeaveLink);
    });
    
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnterLink);
        link.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
    };
  }, []);
  
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(12, 147, 228, 0.2)',
      borderColor: 'rgba(12, 147, 228, 0.5)',
      mixBlendMode: 'normal',
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(237, 71, 138, 0.2)',
      borderColor: 'rgba(237, 71, 138, 0.5)',
      mixBlendMode: 'difference',
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 24,
      width: 24,
      backgroundColor: 'rgba(237, 71, 138, 0.4)',
      borderColor: 'rgba(237, 71, 138, 0.8)',
    },
  };
  
  // Hide custom cursor for mobile devices
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
    return null;
  }
  
  return (
    <>
      <motion.div
        className="hidden md:block fixed top-0 left-0 rounded-full border-2 pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-4 h-4 rounded-full bg-primary-400 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 40 }}
      />
    </>
  );
};

export default CustomCursor;