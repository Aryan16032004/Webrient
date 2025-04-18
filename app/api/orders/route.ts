import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import Template from '@/models/Template';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: 'Unauthorized - Please log in' },
      { status: 401 }
    );
  }

  try {
    const { templateId, customerDetails, paymentId } = await request.json();

    if (!templateId || !customerDetails) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const template = await Template.findById(templateId);
    if (!template) {
      return NextResponse.json(
        { message: 'Template not found' },
        { status: 404 }
      );
    }

    const order = await Order.create({
      user: session.user.id,
      userEmail: session.user.email,
      template: templateId,
      customerDetails,
      totalPrice: template.price,
      status: 'completed',
      paymentId,
    });

    const populatedOrder = await Order.findById(order._id)
      .populate('template')
      .populate('user');

    return NextResponse.json(
      {
        message: 'Order created successfully',
        order: populatedOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { message: 'Failed to create order' },
      { status: 500 }
    );
  }
}