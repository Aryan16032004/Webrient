'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FiPlus, FiShoppingBag, FiUser, FiSettings, FiExternalLink } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

type Order = {
  _id: string;
  orderNumber: string;
  template: {
    _id: string;
    name: string;
    imageUrl: string;
  };
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  totalPrice: number;
  createdAt: string;
};

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrders = async () => {
      if (status === 'unauthenticated') {
        toast.error('Please log in to access the dashboard');
        router.push('/login?redirect=/dashboard');
        return;
      }

      if (status === 'authenticated') {
        setIsLoading(true);
        try {
          const response = await fetch('/api/orders');
          if (!response.ok) {
            throw new Error('Failed to fetch orders');
          }
          const data = await response.json();
          setOrders(data.orders);
        } catch (error) {
          console.error('Error fetching orders:', error);
          toast.error('Failed to fetch orders');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchOrders();
  }, [router, status]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'processing':
        return 'bg-blue-500/20 text-blue-500';
      case 'completed':
        return 'bg-green-500/20 text-green-500';
      case 'cancelled':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-400">
                Welcome back, {session.user?.name || 'User'}
              </p>
            </div>
            
            <Link href="/templates" className="btn-primary mt-4 md:mt-0 flex items-center">
              <FiPlus className="mr-2" /> New Order
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center mr-4">
                  <FiShoppingBag size={20} />
                </div>
                <h2 className="text-lg font-semibold">Orders</h2>
              </div>
              <p className="text-3xl font-bold mb-2">{orders.length}</p>
              <p className="text-gray-400">Total orders placed</p>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center mr-4">
                  <FiUser size={20} />
                </div>
                <h2 className="text-lg font-semibold">Account</h2>
              </div>
              <p className="text-xl font-medium mb-2">{session.user?.email}</p>
              <p className="text-gray-400">Your account email</p>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center mr-4">
                  <FiSettings size={20} />
                </div>
                <h2 className="text-lg font-semibold">Settings</h2>
              </div>
              <p className="text-gray-400 mb-4">Manage your account settings</p>
              <Link href="/dashboard/settings" className="text-blue-400 hover:text-blue-300 flex items-center">
                Go to Settings <FiExternalLink className="ml-2" />
              </Link>
            </div>
          </div>
          
          <div className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">You haven't placed any orders yet.</p>
                <Link href="/templates" className="btn-primary">
                  Browse Templates
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Order</th>
                      <th className="text-left py-3 px-4">Template</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Total</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="border-b border-gray-800 hover:bg-gray-900/30">
                        <td className="py-4 px-4">
                          <span className="font-medium">{order.orderNumber}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded overflow-hidden mr-3">
                              <img
                                src={order.template.imageUrl}
                                alt={order.template.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span>{order.template.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          ${order.totalPrice.toFixed(2)}
                        </td>
                        <td className="py-4 px-4">
                          <Link
                            href={`/dashboard/orders/${order._id}`}
                            className="text-purple-400 hover:text-purple-300"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-6">Need Help?</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions or need assistance with your orders, our support team is here to help.
            </p>
            <Link href="/contact" className="btn-secondary inline-flex items-center">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}