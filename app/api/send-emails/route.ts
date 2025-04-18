import { AdminNotification } from '@/components/emails/AdminNotification';
import { CustomerConfirmation } from '@/components/emails/CustomerConfirmation';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { orderNumber, businessName, customerEmail, customerName, templateName, amount, requirements } = await request.json();

    // 1. Send to admin (aryan16062004@gmail.com must be in Resend's test emails)
    await resend.emails.send({
      from: 'Webirent <onboarding@resend.dev>',
      to: ['aryan16062004@gmail.com'],
      subject: `[TEST] New Order: ${orderNumber}`,
      react: AdminNotification({ orderNumber, businessName, customerEmail, templateName, amount, requirements }),
    });

    // 2. Send to customer (customerEmail must be in Resend's test emails)
    await resend.emails.send({
      from: 'Webirent <support@resend.dev>',
      to: [customerEmail],
      subject: `[TEST] Your Order #${orderNumber}`,
      react: CustomerConfirmation({
        firstName: customerName.split(' ')[0] || 'Customer',
        orderNumber,
        templateName,
        amount
      }),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ error: "Email sending failed" }, { status: 500 });
  }
}