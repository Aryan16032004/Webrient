'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FiArrowLeft, FiCheck, FiExternalLink, FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-hot-toast';


type Template = {
  _id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
  demoUrl: string;
  price: number;
  features: string[];
  isPopular: boolean;
};

export default function TemplateDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplate = async () => {
      console.log('Fetching template:', params.id);
      
      setIsLoading(true);
      try {
        const response = await fetch(`/api/templates/${params.id}`);
        const data = await response.json();

        if (response.ok) {
          setTemplate(data.template);
        } else {
          toast.error(data.message || 'Failed to fetch template');
          router.push('/templates');
        }
      } catch (error) {
        console.error('Error fetching template:', error);
        toast.error('An error occurred while fetching the template');
        router.push('/templates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplate();
  }, [params.id, router]);

  const handleOrderClick = () => {
    if (!session) {
      toast.error('Please log in to order this template');
      router.push(`/login?redirect=/templates/${params.id}`);
      return;
    }

    router.push(`/order/${params.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Template not found</h2>
          <Link href="/templates" className="btn-primary">
            Browse Templates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/templates" className="text-purple-400 hover:text-purple-300 flex items-center">
              <FiArrowLeft className="mr-2" /> Back to Templates
            </Link>
          </div>

          {/* Template Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="glass-card p-4 overflow-hidden">
              <div className="relative h-80 overflow-hidden rounded-md">
                <img
                  src={template.imageUrl}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                {template.isPopular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded">
                    Popular
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="h-32 overflow-hidden rounded-md bg-gray-800">
                  <img
                    src={template.imageUrl}
                    alt={`${template.name} preview 1`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 overflow-hidden rounded-md bg-gray-800">
                  <img
                    src={template.imageUrl}
                    alt={`${template.name} preview 2`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">{template.name}</h1>

              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-purple-400 mr-4">${template.price}</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                  {template.category}
                </span>
              </div>

              <p className="text-gray-300 mb-6">{template.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {template.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleOrderClick}
                  className="btn-primary flex items-center justify-center"
                >
                  <FiShoppingCart className="mr-2" /> Order Now
                </button>
                <a
                  href={template.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center"
                >
                  <FiExternalLink className="mr-2" /> Live Demo
                </a>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Template Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <p className="text-gray-300">
                  {template.description}
                </p>
                <p className="text-gray-300 mt-4">
                  This template is perfect for {template.category.toLowerCase()} websites looking to make a strong impression.
                  With its modern design and comprehensive features, it provides everything you need to create a professional online presence.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><strong>Responsive:</strong> Yes, works on all devices</li>
                  <li><strong>Framework:</strong> Next.js</li>
                  <li><strong>Styling:</strong> Tailwind CSS</li>
                  <li><strong>Database:</strong> MongoDB</li>
                  <li><strong>Authentication:</strong> NextAuth.js</li>
                  <li><strong>Deployment:</strong> Ready for Vercel, Netlify, or any hosting</li>
                  <li><strong>Browser Support:</strong> All modern browsers</li>
                  <li><strong>Documentation:</strong> Included</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
            <button
              onClick={handleOrderClick}
              className="btn-primary px-8 py-3 text-lg"
            >
              Order This Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}