'use client';

import { motion } from 'framer-motion';
import { FiSearch, FiEdit, FiShoppingCart, FiCode, FiSmartphone, FiLayers } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: <FiSearch className="text-purple-500" size={24} />,
      title: 'AI-Powered Search',
      description: 'Describe your ideal website and our AI will suggest the perfect templates for your needs.'
    },
    {
      icon: <FiEdit className="text-pink-500" size={24} />,
      title: 'Easy Customization',
      description: 'Customize your chosen template with your brand colors, fonts, and content without coding.'
    },
    {
      icon: <FiShoppingCart className="text-blue-500" size={24} />,
      title: 'Simple Ordering',
      description: 'Select your template, provide your details, and complete your order in minutes.'
    },
    {
      icon: <FiCode className="text-purple-500" size={24} />,
      title: 'Clean Code',
      description: 'All templates are built with modern technologies and follow best practices for performance.'
    },
    {
      icon: <FiSmartphone className="text-pink-500" size={24} />,
      title: 'Responsive Design',
      description: 'Every template is fully responsive and looks great on all devices, from mobile to desktop.'
    },
    {
      icon: <FiLayers className="text-blue-500" size={24} />,
      title: 'Regular Updates',
      description: 'Our templates are regularly updated with new features and security patches.'
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-dark-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose <span className="gradient-text">Webirent</span>?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We make it easy to find, customize, and launch the perfect website for your business or personal project.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="glass-card p-6 h-full"
              variants={itemVariants}
            >
              <div className="mb-4 text-3xl">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;