import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Users, Globe, TrendingUp, Rocket } from 'lucide-react';

const AboutPage: React.FC = () => {
  const timeline = [
    {
      year: '2015',
      title: 'Company Founded',
      description: 'Started as a small team of passionate developers with a vision to transform digital experiences.',
      icon: <Calendar className="h-6 w-6 text-primary-400" />,
    },
    {
      year: '2017',
      title: 'First Major Client',
      description: 'Secured our first enterprise client and delivered a groundbreaking digital transformation project.',
      icon: <Award className="h-6 w-6 text-primary-400" />,
    },
    {
      year: '2019',
      title: 'Global Expansion',
      description: 'Opened offices in multiple countries and built a diverse team of international talent.',
      icon: <Globe className="h-6 w-6 text-primary-400" />,
    },
    {
      year: '2021',
      title: 'Innovation Award',
      description: 'Recognized as the Most Innovative Digital Agency at the Global Tech Awards.',
      icon: <Rocket className="h-6 w-6 text-primary-400" />,
    },
    {
      year: '2023',
      title: 'Market Leader',
      description: 'Became the market leader in digital transformation solutions with over 500 successful projects.',
      icon: <TrendingUp className="h-6 w-6 text-primary-400" />,
    },
    {
      year: '2025',
      title: 'Future Vision',
      description: 'Continuing to push boundaries and shape the future of digital innovation.',
      icon: <Users className="h-6 w-6 text-primary-400" />,
    },
  ];

  const stats = [
    { value: '500+', label: 'Clients Worldwide' },
    { value: '1200+', label: 'Projects Completed' },
    { value: '150+', label: 'Team Members' },
    { value: '25+', label: 'Countries Served' },
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'We constantly push boundaries and embrace emerging technologies.',
    },
    {
      title: 'Client Success',
      description: 'Your success is our success. We are committed in delivering exceptional results.',
    },
    {
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in everything we do.',
    },
    {
      title: 'Global Perspective',
      description: 'Our diverse team brings worldwide insights and expertise.',
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-dark-400">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-gradient">Journey</span>
            </h1>
            <p className="text-xl text-gray-400">
              From humble beginnings to industry leadership, discover the story of how we're 
              transforming the digital landscape and shaping the future of technology.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Timeline</h2>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex gap-8 mb-12"
              >
                <div className="flex-shrink-0 w-24 pt-3">
                  <div className="text-xl font-bold text-primary-400">{item.year}</div>
                </div>
                <div className="flex-grow glass rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-primary-500/10 rounded-lg">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-dark-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto glass rounded-xl p-8"
          >
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-xl text-gray-400">
              To be the global leader in digital innovation, empowering businesses to thrive in 
              the digital age through cutting-edge solutions and unparalleled expertise.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;