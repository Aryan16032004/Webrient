import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 border border-gray-800 gradient-border">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create Your <span className="gradient-text">Perfect Website</span>?</h2>
            <p className="text-xl text-gray-300">
              Get started today and have your custom website up and running in no time.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/templates" className="btn-primary text-center">
              Browse Templates
            </Link>
            <Link href="/register" className="btn-secondary text-center">
              Create Account
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white flex items-center justify-center">
              Contact Us <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;