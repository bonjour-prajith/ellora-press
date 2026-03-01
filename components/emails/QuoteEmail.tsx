import * as React from 'react';

interface QuoteEmailProps {
  email: string;
  details: string;
}

export const QuoteEmail: React.FC<Readonly<QuoteEmailProps>> = ({
  email,
  details,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', border: '1px solid #eee' }}>
    <h1>New Quote Request from Ellora Press</h1>
    <p><strong>Client Email:</strong> {email}</p>
    <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9' }}>
      <strong>Project Details:</strong>
      <p>{details}</p>
    </div>
  </div>
);