import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import ParticleBackground from './ui/ParticleBackground';
import TextAnimation from './ui/TextAnimation';
import ParticleText from './ui/ParticleText';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.3 });
  const [contentVisible, setContentVisible] = useState(false);

  // Trigger animation after component mounts and is in view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setContentVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();

      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      const elements = heroRef.current.querySelectorAll('.parallax');
      elements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '5');
        const xOffset = x * speed;
        const yOffset = y * speed;
        (el as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      ref={heroRef}
    >
      <ParticleBackground />

      <div className="container mx-auto px-4 z-10 py-20">
        <motion.div
          ref={contentRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="mb-6">
            {contentVisible && (
              <div className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <ParticleText
                  text="Elevate Your Digital"
                  className="h-16 md:h-20 lg:h-24 mb-2 w-full"
                  textClassName="text-gradient"
                  delay={0.2}
                  particleCount={100}
                  particleColor="rgba(12, 147, 228, 0.7)"
                />
                <div className="relative inline-block">
                  <TextAnimation
                    text="Experience"
                    className="relative inline-block parallax"
                    delay={1.2}
                    duration={0.8}
                    tag="span"
                    charClassName="text-white"
                  />
                </div>
              </div>
            )}
          </div>

          {contentVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="overflow-hidden"
            >
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                <TextAnimation
                  text="Transform your online presence with our cutting-edge solutions. We craft extraordinary digital experiences that captivate and convert."
                  delay={2.0}
                  duration={0.5}
                  tag="span"
                />
              </p>
            </motion.div>
          )}

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={contentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 2.5 }}
          >
            <button className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300 group w-full sm:w-auto">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button className="bg-transparent border border-gray-700 text-gray-300 px-8 py-3 rounded-full hover:bg-dark-200 transition-all duration-300 w-full sm:w-auto">
              Learn More
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={contentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 2.8 }}
            className="mt-16 md:mt-24 flex items-center justify-center"
          >
            <a
              href="#services"
              className="flex flex-col items-center text-gray-400 hover:text-primary-400 transition-colors"
            >
              <span className="text-sm mb-2">Scroll Down</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-0 left-0 w-full"
        >
          <div className="w-full h-24 bg-gradient-to-t from-dark-300 to-transparent"></div>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/6 w-16 h-16 rounded-full bg-primary-500/20 animate-float-slow blur-xl parallax" data-speed="8"></div>
        <div className="absolute bottom-1/4 right-1/6 w-24 h-24 rounded-full bg-accent-500/20 animate-float blur-xl parallax" data-speed="6"></div>
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 rounded-full bg-secondary-500/20 animate-float-fast blur-xl parallax" data-speed="10"></div>
      </div>
    </section>
  );
};

export default Hero;