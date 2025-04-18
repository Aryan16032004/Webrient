'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Get in <span className="gradient-text">Touch</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Have questions or need assistance? We're here to help.
              Reach out to our team and we'll get back to you as soon as possible.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Contact Info & Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <motion.div 
                  className="glass-card p-8 h-full"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center mr-4 flex-shrink-0">
                        <FiMail size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Email</h3>
                        <a href="mailto:info@webirent.com" className="text-gray-300 hover:text-white transition-colors">
                          info@webirent.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center mr-4 flex-shrink-0">
                        <FiPhone size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Phone</h3>
                        <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                          +1 (234) 567-890
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
                        <FiMapPin size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Office</h3>
                        <p className="text-gray-300">
                          123 Web Design Street<br />
                          San Francisco, CA 94107<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Business Hours</h3>
                    <p className="text-gray-300 mb-2">
                      <span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-gray-300">
                      <span className="font-medium">Saturday - Sunday:</span> Closed
                    </p>
                  </div>
                </motion.div>
              </div>
              
              {/* Contact Form */}
              <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="glass-card p-8">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Your Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiUser className="text-gray-500" />
                          </div>
                          <input
                            id="name"
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="input-field pl-10"
                            placeholder="John Doe"
                          />
                        </div>
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Your Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiMail className="text-gray-500" />
                          </div>
                          <input
                            id="email"
                            type="email"
                            {...register('email', { 
                              required: 'Email is required',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                              }
                            })}
                            className="input-field pl-10"
                            placeholder="you@example.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        {...register('subject', { required: 'Subject is required' })}
                        className="input-field"
                        placeholder="How can we help you?"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                        Message
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <FiMessageSquare className="text-gray-500" />
                        </div>
                        <textarea
                          id="message"
                          rows={6}
                          {...register('message', { required: 'Message is required' })}
                          className="input-field pl-10"
                          placeholder="Your message here..."
                        ></textarea>
                      </div>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full md:w-auto flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <FiSend className="mr-2" /> Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-dark-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h2>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-2">How long does it take to get my website?</h3>
                <p className="text-gray-300">
                  After placing your order, we typically deliver your customized website within 3-5 business days. 
                  For more complex projects, it may take a bit longer, but we'll always keep you updated on the progress.
                </p>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-2">Can I request revisions to my template?</h3>
                <p className="text-gray-300">
                  Yes, absolutely! We offer two rounds of revisions with every order to ensure you're completely satisfied with your website. 
                  Additional revisions can be requested for a small fee.
                </p>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-2">Do you provide hosting for the websites?</h3>
                <p className="text-gray-300">
                  We don't provide hosting directly, but we can help you set up your website on popular hosting platforms like Vercel, Netlify, or AWS. 
                  We'll provide detailed instructions and support throughout the process.
                </p>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-2">Can I update the website myself after it's delivered?</h3>
                <p className="text-gray-300">
                  Yes, all our templates are designed to be user-friendly and easy to update. 
                  We provide documentation on how to make common changes, and our support team is always available to help if you need assistance.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}