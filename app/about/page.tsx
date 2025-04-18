'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function About() {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Alex founded Webirent with a vision to make professional web design accessible to everyone. With over 10 years of experience in web development and design, he leads our creative direction.',
    },
    {
      name: 'Sarah Chen',
      role: 'Lead Designer',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Sarah brings 8 years of UI/UX design experience to the team. She oversees all template designs, ensuring they meet the highest standards of aesthetics and usability.',
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO',
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
      bio: 'Michael manages our technical infrastructure and development team. With a background in software engineering at major tech companies, he ensures our platform runs smoothly.',
    },
    {
      name: 'Emily Wilson',
      role: 'Customer Success Manager',
      image: 'https://randomuser.me/api/portraits/women/17.jpg',
      bio: 'Emily leads our customer support team, ensuring clients receive exceptional service. Shes passionate about helping businesses succeed online through great web design.',
    },
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
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About <span className="gradient-text">Webirent</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We're on a mission to make professional web design accessible to everyone.
              Our AI-powered platform helps businesses of all sizes create stunning websites without the complexity.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-dark-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Story
            </motion.h2>
            
            <motion.div 
              className="glass-card p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-gray-300 mb-4">
                Webirent was founded in 2023 with a simple idea: make professional web design accessible to everyone. 
                We noticed that many small businesses and entrepreneurs struggled to create websites that truly represented their brand and vision.
              </p>
              
              <p className="text-gray-300 mb-4">
                Traditional web design agencies were too expensive for many, while DIY website builders often produced generic, cookie-cutter results. 
                We wanted to bridge this gap by combining the power of AI with professional design expertise.
              </p>
              
              <p className="text-gray-300 mb-4">
                Our team of designers and developers created a platform that uses natural language processing to understand exactly what our clients need. 
                By simply describing your ideal website, our system can suggest professionally designed templates that match your vision.
              </p>
              
              <p className="text-gray-300">
                Today, Webirent helps businesses of all sizes establish their online presence with beautiful, functional websites that stand out from the crowd. 
                We're proud to have served thousands of clients across various industries, from e-commerce stores to professional portfolios and corporate sites.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Values
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="glass-card p-6" variants={itemVariants}>
              <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center mb-4 text-2xl">
                ✨
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-gray-300">
                We believe in delivering exceptional quality in every template and service. Our designs are meticulously crafted to ensure they meet the highest standards of aesthetics and functionality.
              </p>
            </motion.div>
            
            <motion.div className="glass-card p-6" variants={itemVariants}>
              <div className="w-16 h-16 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center mb-4 text-2xl">
                🤝
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Success</h3>
              <p className="text-gray-300">
                Your success is our success. We're committed to providing the support and resources you need to create a website that helps your business thrive online.
              </p>
            </motion.div>
            
            <motion.div className="glass-card p-6" variants={itemVariants}>
              <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center mb-4 text-2xl">
                🚀
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-300">
                We continuously push the boundaries of what's possible in web design, leveraging the latest technologies and design trends to keep our templates fresh and cutting-edge.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-dark-300">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Meet Our Team
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index} 
                className="glass-card overflow-hidden"
                variants={itemVariants}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-purple-400 mb-4">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 border border-gray-800 gradient-border">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
              <p className="text-xl text-gray-300">
                Start creating your perfect website today with Webirent.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/templates" className="btn-primary text-center">
                Browse Templates
              </Link>
              <Link href="/contact" className="btn-secondary text-center">
                Contact Us
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white flex items-center justify-center">
                View Pricing <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}