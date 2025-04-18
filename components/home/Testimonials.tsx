'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Small Business Owner',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    content: 'Webirent made it so easy to get my business online. I described what I needed, and they suggested the perfect template. The whole process was smooth and the result looks professional!',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Freelance Photographer',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    content: 'As a photographer, I needed a portfolio that would showcase my work beautifully. Webirent delivered exactly what I needed. The templates are modern and the customization options are great.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Restaurant Owner',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    content: 'Our restaurant needed a website that would allow customers to view our menu and make reservations. Webirents template was perfect and we were up and running in no time!',
    rating: 4
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Fitness Trainer',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    content: 'I was able to describe exactly what I wanted for my fitness coaching business, and Webirent suggested templates that matched my vision perfectly. The ordering process was simple and fast.',
    rating: 5
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'E-commerce Store Owner',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    content: 'Setting up an online store seemed daunting, but Webirent made it easy. Their e-commerce templates are feature-rich and the customer support has been excellent throughout the process.',
    rating: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-dark-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our <span className="gradient-text">Clients Say</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their experience with Webirent.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="glass-card p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">{testimonials[currentIndex].name}</h3>
                <p className="text-gray-400 text-center mb-4">{testimonials[currentIndex].role}</p>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <FiStar key={i} className="fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="md:w-2/3">
                <motion.blockquote
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg italic text-gray-300 mb-6"
                >
                  "{testimonials[currentIndex].content}"
                </motion.blockquote>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft size={24} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;