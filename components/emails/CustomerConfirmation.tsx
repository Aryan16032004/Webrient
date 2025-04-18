import { Html, Head, Body, Container, Section, Text, Heading } from '@react-email/components';

interface CustomerConfirmationProps {
  firstName: string;
  orderNumber: string;
  templateName: string;
  amount: number;
}

export function CustomerConfirmation({
  firstName,
  orderNumber,
  templateName,
  amount
}: CustomerConfirmationProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank you for your order, {firstName}!</Heading>
          <Text style={text}>Your order <strong>{orderNumber}</strong> has been successfully processed.</Text>
          
          <Section style={section}>
            <Text style={text}>Template: <strong>{templateName}</strong></Text>
            <Text style={text}>Amount Paid: <strong>₹{amount.toFixed(2)}</strong></Text>
          </Section>
          
          <Text style={text}>We'll review your requirements and contact you within 24 hours.</Text>
          <Text style={footer}>If you have any questions, please reply to this email.</Text>
        </Container>
      </Body>
    </Html>
  );
}

// Reuse the same styles from AdminNotification or customize as needed
const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
};

const h1 = {
  color: '#333333',
  fontSize: '24px',
  marginBottom: '20px',
};

const text = {
  color: '#333333',
  fontSize: '16px',
  marginBottom: '10px',
};

const section = {
  margin: '20px 0',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '5px',
};

const footer = {
  color: '#666666',
  fontSize: '14px',
  marginTop: '20px',
};