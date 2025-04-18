'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function AddTemplate() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: '',
    imageUrl: '',
    demoUrl: '',
    price: 0,
    features: '',
    isPopular: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const isChecked = (e.target as HTMLInputElement).checked;
      setFormData((prevData) => ({
        ...prevData,
        [name]: isChecked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map((tag) => tag.trim()),
          features: formData.features.split(',').map((feature) => feature.trim()),
        }),
      });

      if (response.ok) {
        const { template } = await response.json();
        toast.success('Template added successfully!');
        router.push(`/templates/${template._id}`);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to add template');
      }
    } catch (error) {
      console.error('Error adding template:', error);
      toast.error('An error occurred while adding the template');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => router.push('/templates')}
              className="text-purple-400 hover:text-purple-300 flex items-center"
            >
              <FiArrowLeft className="mr-2" /> Back to Templates
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-8">Add New Template</h1>

          <form onSubmit={handleSubmit} className="glass-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Template Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter template name"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter template description"
                  rows={3}
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Select category</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Portfolio">Portfolio</option>
                  <option value="Blog">Blog</option>
                  <option value="Business">Business</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter image URL"
                />
              </div>

              {/* Demo URL */}
              <div>
                <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-300 mb-1">
                  Demo URL
                </label>
                <input
                  type="url"
                  id="demoUrl"
                  name="demoUrl"
                  value={formData.demoUrl}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter demo URL"
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter price"
                />
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter tags (e.g., shop, modern)"
                />
              </div>

              {/* Features */}
              <div className="md:col-span-2">
                <label htmlFor="features" className="block text-sm font-medium text-gray-300 mb-1">
                  Features (comma-separated)
                </label>
                <textarea
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter features (e.g., responsive design, product gallery)"
                  rows={3}
                />
              </div>

              {/* Is Popular */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPopular"
                  name="isPopular"
                  checked={formData.isPopular}
                  onChange={handleChange}
                  className="h-4 w-4 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="isPopular" className="ml-2 text-sm text-gray-300">
                  Mark as Popular
                </label>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center"
              >
                {isLoading ? 'Adding Template...' : 'Add Template'} <FiPlus className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}