
// troubleshoot.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function troubleshootEmail() {
  console.log('Attempting to send a test email...');

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Myra Foods Troubleshooting" <${process.env.SMTP_USER}>`,
      to: process.env.OFFICIAL_MAIL,
      subject: 'Email Configuration Test',
      text: 'This is a test email to verify your SMTP configuration.',
      html: '<p>This is a test email to verify your SMTP configuration.</p>',
    });

    console.log('✅ Test email sent successfully!', info);
  } catch (error) {
    console.error('❌ Failed to send test email:', error);
  }
}

troubleshootEmail();
