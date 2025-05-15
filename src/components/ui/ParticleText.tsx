import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ParticleTextProps {
  text: string;
  className?: string;
  textClassName?: string;
  duration?: number;
  delay?: number;
  particleCount?: number;
  particleColor?: string;
}

const ParticleText: React.FC<ParticleTextProps> = ({
  text,
  className = '',
  textClassName = '',
  duration = 1.5,
  delay = 0,
  particleCount = 40,
  particleColor = 'rgba(255, 255, 255, 0.7)',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !textRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const updateCanvasSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    const rect = textRef.current.getBoundingClientRect();
    const textCenter = {
      x: rect.left + rect.width / 2 - (containerRef.current.getBoundingClientRect().left || 0),
      y: rect.top + rect.height / 2 - (containerRef.current.getBoundingClientRect().top || 0),
    };
    
    // Create particles
    const particles: { x: number; y: number; size: number; vx: number; vy: number; color: string; alpha: number; targetX: number; targetY: number }[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Random starting position from edges
      let x, y;
      if (Math.random() < 0.5) {
        // Start from left or right edge
        x = Math.random() < 0.5 ? 0 : canvas.width;
        y = Math.random() * canvas.height;
      } else {
        // Start from top or bottom edge
        x = Math.random() * canvas.width;
        y = Math.random() < 0.5 ? 0 : canvas.height;
      }
      
      // Target position with some randomness around text
      const targetX = textCenter.x + (Math.random() * rect.width - rect.width / 2) * 0.8;
      const targetY = textCenter.y + (Math.random() * rect.height - rect.height / 2) * 0.8;
      
      particles.push({
        x,
        y,
        size: Math.random() * 3 + 1,
        vx: 0,
        vy: 0,
        color: particleColor,
        alpha: Math.random() * 0.5 + 0.3,
        targetX,
        targetY,
      });
    }
    
    let animationFrame: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        // Calculate vector to target
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Accelerate towards target
        p.vx += dx * 0.01;
        p.vy += dy * 0.01;
        
        // Apply drag
        p.vx *= 0.95;
        p.vy *= 0.95;
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Fade out as particles approach target
        const targetAlpha = distance < 10 ? Math.max(0, p.alpha * (distance / 10)) : p.alpha;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace('0.7', targetAlpha.toString());
        ctx.fill();
      });
      
      // Continue animation
      animationFrame = requestAnimationFrame(animate);
    };
    
    // Delay the start of animation
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay * 1000);
    
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [text, particleCount, delay, particleColor]);
  
  return (
    <motion.div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        transition: { 
          duration: 0.3, 
          delay: delay 
        }
      }}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
      <motion.div 
        ref={textRef}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { 
            duration: duration,
            delay: delay + 0.5
          }
        }}
        className={textClassName}
      >
        {text}
      </motion.div>
    </motion.div>
  );
};

export default ParticleText;