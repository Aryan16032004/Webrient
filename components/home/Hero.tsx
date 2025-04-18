'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      window.location.href = `/templates?prompt=${encodeURIComponent(prompt)}`;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Create Your Perfect Website with <span className="gradient-text">Webirent</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Describe your dream website, and we'll suggest the perfect templates. 
            Select, customize, and launch your site in minutes.
          </motion.p>
          
          <motion.div
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your ideal website (e.g., 'A modern e-commerce site for handmade jewelry')"
                className="input-field flex-grow text-lg py-4"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap text-lg py-4 flex items-center justify-center">
                Get Templates <FiArrowRight className="ml-2" />
              </button>
            </form>
          </motion.div>
          
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300">E-commerce</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300">Portfolio</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300">Blog</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300">Business</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300">Landing Page</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8"
          >
            <Link href="/templates" className="btn-secondary">
              Browse All Templates
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white flex items-center">
              View Pricing <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;