    import * as React from 'react';
    import { Html, Body, Container, Head, Heading, Text, Section, Hr, Link, Img, Column, Row } from '@react-email/components';

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ellorapress.com').replace(/\/$/, '');
    const logoUrl = `${siteUrl}/1x/logo.png`;

    export const AutoReplyEmail = () => (
    <Html>
        <Head />
        <Body style={{ fontFamily: 'Inter, Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '0' }}>
        
        {/* Full-width logo only (no extra banner background/container styling) */}
        <Section style={{ padding: '0', margin: '0', lineHeight: '0' }}>
            <Img
              src={logoUrl}
              alt=""
              width="600"
              style={{
                width: '100%',
                maxWidth: '600px',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
                border: '0',
                outline: 'none',
                textDecoration: 'none',
              }}
            />
        </Section>

        <Container style={{ backgroundColor: '#ffffff', padding: '40px', maxWidth: '600px', borderRadius: '8px' }}>
            <Heading style={{ color: '#000000', fontSize: '22px' }}>Thanks for reaching out!</Heading>
            <Text style={{ color: '#333', fontSize: '16px' }}>
            To provide you with the most accurate quote, please reply to this email with these details:
            </Text>

            <Section style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '4px', borderLeft: '4px solid #000' }}>
            <ul style={{ color: '#000', paddingLeft: '20px', margin: 0, listStyleType: 'none' }}>
                <li style={{ padding: '4px 0' }}><strong>Paper Type:</strong></li>
                <li style={{ padding: '4px 0' }}><strong>GSM:</strong></li>
                <li style={{ padding: '4px 0' }}><strong>Color (2 or 4):</strong></li>
                <li style={{ padding: '4px 0' }}><strong>Binding:</strong></li>
                <li style={{ padding: '4px 0' }}><strong>Lamination:</strong></li>
                <li style={{ padding: '4px 0' }}><strong>Special Finishes:</strong></li>
                <li style={{ padding: '4px 0' }}><strong>Die Punching:</strong></li>
            </ul>
            </Section>

            <Text style={{ fontSize: '16px', color: '#333' }}>
            Not sure what to choose? Call us for help at <Link href="tel:+918939000230" style={{ color: '#000', fontWeight: 'bold' }}>+91 8939000230</Link>.
            </Text>

            <Hr style={{ borderColor: '#eee', margin: '30px 0' }} />

            {/* Enhanced Guidelines Section */}
            <Section style={{ backgroundColor: '#000', padding: '25px', borderRadius: '8px' }}>
            <Heading style={{ color: '#fff', fontSize: '18px', marginTop: 0 }}>Design File Guidelines</Heading>
            <Text style={{ color: '#ccc', fontSize: '14px', marginBottom: '20px' }}>Ensure your files meet these standards for optimal print quality:</Text>
            <Row>
                <Column style={{ width: '50%', paddingRight: '8px' }}>
                <Text style={{ color: '#fff', fontSize: '12px', lineHeight: '18px', margin: '6px 0', whiteSpace: 'nowrap' }}>✦ 300 DPI</Text>
                </Column>
                <Column style={{ width: '50%', paddingLeft: '8px' }}>
                <Text style={{ color: '#fff', fontSize: '12px', lineHeight: '18px', margin: '6px 0', whiteSpace: 'nowrap' }}>✦ 3mm Bleed</Text>
                </Column>
            </Row>
            <Row>
                <Column style={{ width: '50%', paddingRight: '8px' }}>
                <Text style={{ color: '#fff', fontSize: '12px', lineHeight: '18px', margin: '6px 0', whiteSpace: 'nowrap' }}>✦ CMYK Mode</Text>
                </Column>
                <Column style={{ width: '50%', paddingLeft: '8px' }}>
                <Text style={{ color: '#fff', fontSize: '12px', lineHeight: '18px', margin: '6px 0', whiteSpace: 'nowrap' }}>✦ Outlined Fonts</Text>
                </Column>
            </Row>
            </Section>

            {/* Footer */}
            <Text style={{ fontStyle: 'italic', color: '#333', marginTop: '40px', fontSize: '16px' }}>
            &quot;Judge a Book by it&apos;s Cover.&quot;
            </Text>
            <Text style={{ fontSize: '14px', color: '#1a1a1a', fontWeight: 'bold', margin: '5px 0' }}>Ellora Press (P) Ltd</Text>
            <Text style={{ fontSize: '10px', color: '#666', margin: '5px 0' }}>19, Mayor Chittibabu St, Triplicane, Chennai - 600005</Text>
            <Link href={siteUrl} style={{ fontSize: '13px', color: '#666', textDecoration: 'underline' }}>{siteUrl.replace(/^https?:\/\//, '')}</Link>
        </Container>
        </Body>
    </Html>
    );
