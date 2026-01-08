
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Basic Order data interface
interface OrderData {
  id: string;
  customerEmail: string;
  customerName: string;
  total: number;
}

// 1. Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// 2. Email template for the customer
const createCustomerEmailBody = (order: OrderData): string => {
  return `
    <h1>Order Confirmed!</h1>
    <p>Hi ${order.customerName},</p>
    <p>Thank you for your order. Your order ID is <strong>${order.id}</strong>.</p>
    <p>Total Amount: ₹${order.total}</p>
    <p>We've received your order and will process it shortly.</p>
    <p>Thanks for shopping with Myra Foods!</p>
  `;
};

// 3. Email template for the admin
const createAdminEmailBody = (order: OrderData): string => {
  return `
    <h1>New Order Received!</h1>
    <p>A new order has been placed.</p>
    <p><strong>Order ID:</strong> ${order.id}</p>
    <p><strong>Customer:</strong> ${order.customerName} (${order.customerEmail})</p>
    <p><strong>Total Amount:</strong> ₹${order.total}</p>
  `;
};

// 4. Function to send emails
export const sendOrderEmails = async (order: OrderData): Promise<void> => {
  try {
    // Send email to customer
    await transporter.sendMail({
      from: `"Myra Foods" <${process.env.GMAIL_USER}>`,
      to: order.customerEmail,
      subject: `Your Myra Foods Order is Confirmed! (ID: ${order.id})`,
      html: createCustomerEmailBody(order),
    });

    // Send email to admin
    await transporter.sendMail({
      from: `"Myra Foods" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Order Received! (ID: ${order.id})`,
      html: createAdminEmailBody(order),
    });

    console.log(`Emails sent successfully for order ${order.id}`);

  } catch (error) {
    console.error('Error sending order emails:', error);
    // Optionally, re-throw the error to be handled by the caller
    throw new Error('Failed to send order emails.');
  }
};
