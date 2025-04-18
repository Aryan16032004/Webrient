'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiCheck, FiCreditCard } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import Script from 'next/script';

type Template = {
  _id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
};

type FormData = {
  businessName: string;
  contactEmail: string;
  contactPhone: string;
  requirements: string;
};

export default function OrderTemplate({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  useEffect(() => {
    const fetchTemplate = async () => {
      if (status === 'unauthenticated') {
        toast.error('Please log in to place an order');
        router.push(`/login?redirect=/order/${params.id}`);
        return;
      }

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
  }, [params.id, router, status]);
  
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        setRazorpayLoaded(true);
        resolve(true);
      };
      script.onerror = () => {
        console.error('Razorpay SDK failed to load');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const initializeRazorpay = async () => {
    if (typeof window !== 'undefined' && !window.Razorpay) {
      return await loadRazorpay();
    }
    return true;
  };

  const onSubmit = async (data: FormData) => {
    if (!session || !template) return;
    
    setIsSubmitting(true);
    
    try {
      // 1. First load Razorpay if needed
      const razorpayInitialized = await initializeRazorpay();
      if (!razorpayInitialized) {
        throw new Error('Failed to load payment processor');
      }

      // 2. Create Razorpay order
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}` // Add authorization
        },
        body: JSON.stringify({
          amount: template.price * 100,
          currency: 'INR',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }

      const orderData = await response.json();

      // 3. Initialize Razorpay payment
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Webirent",
        description: `Payment for ${template.name}`,
        order_id: orderData.id,
        handler: async function (response: any) {
          // On successful payment
          const orderNumber = `WR-${new Date().getFullYear().toString().slice(-2)}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
          
          try {
            // Save to MongoDB
            const orderResponse = await fetch('/api/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${session.accessToken}`
              },
              body: JSON.stringify({
                templateId: template._id,
                customerDetails: {
                  businessName: data.businessName,
                  contactEmail: data.contactEmail,
                  contactPhone: data.contactPhone,
                  requirements: data.requirements
                },
                paymentId: response.razorpay_payment_id
              }),
            });
        
            if (!orderResponse.ok) {
              throw new Error('Failed to save order to database');
            }
        
            const orderData = await orderResponse.json();
        
            // Save to localStorage for confirmation page
            localStorage.setItem('orderDetails', JSON.stringify({
              orderNumber: orderData.order.orderNumber,
              template: {
                id: template._id,
                name: template.name,
                price: template.price,
              },
              customerDetails: data,
              date: new Date().toISOString(),
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            }));
        
            // Send emails
            try {
              await fetch('/api/send-emails', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  orderNumber: orderData.order.orderNumber,
                  businessName: data.businessName,
                  customerEmail: data.contactEmail,
                  customerName: session.user?.name || data.businessName,
                  templateName: template.name,
                  amount: template.price,
                  requirements: data.requirements
                }),
              });
            } catch (emailError) {
              console.error('Email sending error:', emailError);
            }
        
            toast.success('Payment successful! Order placed.');
            router.push('/order/confirmation');
          } catch (error) {
            console.error('Order processing error:', error);
            toast.error('Order completed but failed to save details. Please contact support.');
            router.push('/order/confirmation');
          }
        },
        prefill: {
          name: session.user?.name || '',
          email: session.user?.email || '',
          contact: data.contactPhone,
        },
        theme: {
          color: '#6366f1',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      
      rzp1.on('payment.failed', function (response: any) {
        toast.error(`Payment failed: ${response.error.description}`);
      });
      
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Failed to process payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading || status === 'loading') {
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href={`/templates/${params.id}`} className="text-purple-400 hover:text-purple-300 flex items-center">
              <FiArrowLeft className="mr-2" /> Back to Template
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mb-8">Order Template</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-6">Your Information</h2>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-1">
                        Business/Project Name
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        {...register('businessName', { required: 'Business name is required' })}
                        className="input-field"
                        placeholder="Your business or project name"
                      />
                      {errors.businessName && (
                        <p className="mt-1 text-sm text-red-400">{errors.businessName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-300 mb-1">
                        Contact Email
                      </label>
                      <input
                        id="contactEmail"
                        type="email"
                        {...register('contactEmail', { 
                          required: 'Contact email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          }
                        })}
                        className="input-field"
                        placeholder="your@email.com"
                      />
                      {errors.contactEmail && (
                        <p className="mt-1 text-sm text-red-400">{errors.contactEmail.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-300 mb-1">
                        Contact Phone
                      </label>
                      <input
                        id="contactPhone"
                        type="tel"
                        {...register('contactPhone', { required: 'Contact phone is required' })}
                        className="input-field"
                        placeholder="Your phone number"
                      />
                      {errors.contactPhone && (
                        <p className="mt-1 text-sm text-red-400">{errors.contactPhone.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="requirements" className="block text-sm font-medium text-gray-300 mb-1">
                        Specific Requirements
                      </label>
                      <textarea
                        id="requirements"
                        rows={5}
                        {...register('requirements', { required: 'Please provide your requirements' })}
                        className="input-field"
                        placeholder="Describe any specific requirements, customizations, or details about your project..."
                      ></textarea>
                      {errors.requirements && (
                        <p className="mt-1 text-sm text-red-400">{errors.requirements.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      'Processing...'
                    ) : (
                      <>
                        <FiCreditCard className="mr-2" /> Complete Order
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            <div>
              <div className="glass-card p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="flex items-start mb-4">
                  <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 mr-4">
                    <img
                      src={template.imageUrl}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-gray-400">{template.category}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 my-4 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Template Price</span>
                    <span>₹{template.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Customization</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Support</span>
                    <span>Included</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 my-4 pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{template.price.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-400">
                  <p className="flex items-start mb-2">
                    <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Free customization based on your requirements</span>
                  </p>
                  <p className="flex items-start mb-2">
                    <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>30 days of technical support included</span>
                  </p>
                  <p className="flex items-start">
                    <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>100% satisfaction guarantee</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}