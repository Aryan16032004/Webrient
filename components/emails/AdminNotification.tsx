import { Html, Head, Body, Container, Section, Text, Heading } from '@react-email/components';

interface AdminNotificationProps {
  orderNumber: string;
  businessName: string;
  customerEmail: string;
  templateName: string;
  amount: number;
  requirements: string;
}

export function AdminNotification({
  orderNumber,
  businessName,
  customerEmail,
  templateName,
  amount,
  requirements
}: AdminNotificationProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Order Received!</Heading>
          <Text style={text}>Order Number: <strong>{orderNumber}</strong></Text>
          <Text style={text}>Business Name: <strong>{businessName}</strong></Text>
          <Text style={text}>Customer Email: <strong>{customerEmail}</strong></Text>
          <Text style={text}>Template: <strong>{templateName}</strong></Text>
          <Text style={text}>Amount: <strong>₹{amount.toFixed(2)}</strong></Text>
          <Section style={section}>
            <Heading style={h2}>Customer Requirements:</Heading>
            <Text style={text}>{requirements}</Text>
          </Section>
          <Text style={footer}>Please process this order as soon as possible.</Text>
        </Container>
      </Body>
    </Html>
  );
}

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

const h2 = {
  color: '#333333',
  fontSize: '20px',
  marginBottom: '15px',
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