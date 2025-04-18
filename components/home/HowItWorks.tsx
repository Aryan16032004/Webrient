'use client';

import { motion } from 'framer-motion';
import { FiMessageSquare, FiGrid, FiCreditCard, FiCheckCircle } from 'react-icons/fi';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FiMessageSquare size={32} />,
      title: 'Describe Your Needs',
      description: 'Tell us what kind of website you need using natural language. Be as specific as you want about features, style, and purpose.'
    },
    {
      icon: <FiGrid size={32} />,
      title: 'Choose a Template',
      description: 'Browse AI-suggested templates that match your requirements. Preview each option to find your perfect fit.'
    },
    {
      icon: <FiCreditCard size={32} />,
      title: 'Place Your Order',
      description: 'Select your template, provide your details, and complete your purchase securely.'
    },
    {
      icon: <FiCheckCircle size={32} />,
      title: 'Get Your Website',
      description: 'Receive your customized website ready to launch, with all your specified requirements implemented.'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It <span className="gradient-text">Works</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get your perfect website in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 text-center relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div className="text-4xl mb-4 text-gray-100 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.a
            href="/templates"
            className="btn-primary inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Get Started Now
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;