import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Template from '@/models/Template';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const template = await Template.findById(params.id);

    if (!template) {
      return NextResponse.json(
        { message: 'Template not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ template });
  } catch (error) {
    console.error('Error fetching template:', error);
    return NextResponse.json(
      { message: 'Failed to fetch template' },
      { status: 500 }
    );
  }
}