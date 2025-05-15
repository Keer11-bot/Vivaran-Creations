import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Layers, Zap, Award, BarChart, Clock } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-primary-400" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee to keep your business running smoothly.'
    },
    {
      icon: <Layers className="h-6 w-6 text-primary-400" />,
      title: 'Scalable Architecture',
      description: 'Our solutions grow with your business, from startup to enterprise, without missing a beat.'
    },
    {
      icon: <Zap className="h-6 w-6 text-primary-400" />,
      title: 'Lightning Fast',
      description: 'Optimized for performance with global CDN and edge caching for lightning-fast load times.'
    },
    {
      icon: <Award className="h-6 w-6 text-primary-400" />,
      title: 'Award-Winning Design',
      description: 'Our design team has won multiple awards for creating intuitive and beautiful interfaces.'
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary-400" />,
      title: 'Advanced Analytics',
      description: 'Comprehensive analytics and reporting to track performance and make data-driven decisions.'
    },
    {
      icon: <Clock className="h-6 w-6 text-primary-400" />,
      title: '24/7 Support',
      description: 'Round-the-clock support from our dedicated team to resolve issues and answer questions.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="features" className="py-20 bg-dark-400 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="Why Choose Us"
          title="Powerful Features"
          description="Our platform comes packed with features designed to elevate your digital presence and drive results."
        />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative animate-on-scroll"
            >
              <div className="flex items-start p-6 glass rounded-xl h-full">
                <div className="mr-4 p-3 rounded-lg bg-primary-500/10">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
                
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-accent-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <button className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-3 rounded-full hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300">
            Explore All Features
          </button>
        </motion.div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-dark-300 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-dark-300 to-transparent"></div>
      <div className="absolute top-1/4 right-20 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-10 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl -z-10"></div>
    </section>
  );
};

export default Features;