import React from 'react';
import { motion } from 'framer-motion';

interface TextAnimationProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  tag?: keyof JSX.IntrinsicElements;
  charClassName?: string;
}

const TextAnimation: React.FC<TextAnimationProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.7,
  tag: Tag = 'div',
  charClassName = '',
}) => {
  // Split text into words
  const words = text.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: delay * i,
      },
    }),
  };
  
  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      x: -20,
      scale: 0.5,
      rotate: Math.random() * 10 - 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
  };
  
  return (
    <motion.div className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-1.5">
          <motion.span
            variants={container}
            initial="hidden"
            animate="visible"
            className="inline-block"
          >
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={child}
                className={`inline-block origin-center ${charClassName}`}
                style={{
                  animationDelay: `${delay + (charIndex * 0.05)}s`,
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export default TextAnimation;