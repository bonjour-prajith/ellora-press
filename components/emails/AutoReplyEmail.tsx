    import * as React from 'react';
    import { Html, Body, Container, Head, Heading, Text, Section, Hr, Link, Img, Column, Row } from '@react-email/components';

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ellorapress.com').replace(/\/$/, '');
    const logoUrl = `${siteUrl}/1x/logo.png`;

    export const AutoReplyEmail = () => (
    <Html>
        <Head />
        <Body style={{ fontFamily: 'Inter, Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '0' }}>
        
        {/* Black Header Banner */}
        <Section style={{ backgroundColor: '#000000', padding: '40px 0', textAlign: 'center' }}>
            <Img src={logoUrl} alt="Ellora Press" width="160" style={{ margin: '0 auto' }} />
            <Text style={{ color: '#ffffff', fontSize: '22px', fontWeight: 'bold', margin: '15px 0 0 0' }}>
            <span style={{ fontWeight: 800 }}>Ellora</span> 
            <span style={{ fontWeight: 400 }}>Press</span>
            </Text>
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
                <Column style={{ width: '50%' }}>
                <Text style={{ color: '#fff', fontSize: '13px', margin: '5px 0' }}>✦ 300 DPI Resolution</Text>
                <Text style={{ color: '#fff', fontSize: '13px', margin: '5px 0' }}>✦ CMYK Color Mode</Text>
                </Column>
                <Column style={{ width: '50%' }}>
                <Text style={{ color: '#fff', fontSize: '13px', margin: '5px 0' }}>✦ 3mm Bleed</Text>
                <Text style={{ color: '#fff', fontSize: '13px', margin: '5px 0' }}>✦ Outlined Fonts</Text>
                </Column>
            </Row>
            </Section>

            {/* Footer */}
            <Text style={{ fontStyle: 'italic', color: '#333', marginTop: '40px', fontSize: '16px' }}>
            "Judge a Book by it's Cover."
            </Text>
            <Text style={{ fontSize: '14px', color: '#1a1a1a', fontWeight: 'bold', margin: '5px 0' }}>Ellora Press (P) Ltd</Text>
            <Text style={{ fontSize: '10px', color: '#666', margin: '5px 0' }}>19, Mayor Chittibabu St, Triplicane, Chennai - 600005</Text>
            <Link href={siteUrl} style={{ fontSize: '13px', color: '#666', textDecoration: 'underline' }}>{siteUrl.replace(/^https?:\/\//, '')}</Link>
        </Container>
        </Body>
    </Html>
    );
