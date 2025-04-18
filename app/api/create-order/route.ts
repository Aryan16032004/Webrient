import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
    try {
        const { amount, currency } = await request.json();
        
        const order = await razorpay.orders.create({
            amount: amount, // Amount in paise
            currency: currency || 'INR',
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        });

        return NextResponse.json({
            id: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { error: 'Failed to create order' }, 
            { status: 500 }
        );
    }
}