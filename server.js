
// server.js - Unified Express + Vite Server
import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 1. Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // Ensure this is an App Password
  },
});

// Verify email config on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// 2. Email Templates
const createCustomerEmailBody = (orderId, customer, pricing) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #d1fae5 0%, #fef08a 100%);
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      padding: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>✅ Order Confirmed, ${customer.name}!</h1>
    <p>Thank you for your order with Myra Foods.</p>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Total Amount:</strong> ₹${pricing.total}</p>
    <p>We are preparing your items and they will be delivered shortly.</p>
  </div>
</body>
</html>
`;

const createAdminEmailBody = (orderId, customer, pricing, items) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #d1fae5 0%, #fef08a 100%);
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      padding: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📦 New Order Received!</h1>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Customer:</strong> ${customer.name} (${customer.email})</p>
    <p><strong>Address:</strong> ${customer.address}</p>
    <p><strong>Total Amount:</strong> ₹${pricing.total} (COD)</p>
    <h3>Items:</h3>
    <ul>
      ${items.map(item => `<li>${item.name} x ${item.quantity}</li>`).join('')}
    </ul>
  </div>
</body>
</html>
`;

// 3. Place Order API
app.post('/api/place-order', async (req, res) => {
  try {
    const { customer, items, pricing } = req.body;

    if (!customer?.name || !customer?.email || !customer?.phone || !customer?.address) {
      return res.status(400).json({ success: false, message: 'Missing required customer fields' });
    }
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    const orderId = `MF${Date.now()}`;
    const timestamp = new Date().toLocaleString('en-IN', { hour12: true });

    // Send email to the customer
    await transporter.sendMail({
      from: `"Myra Foods" <${process.env.GMAIL_USER}>`,
      to: customer.email,
      subject: `✅ Your Myra Foods Order is Confirmed! (${orderId})`,
      html: createCustomerEmailBody(orderId, customer, pricing),
    });

    // Send notification email to the admin
    await transporter.sendMail({
      from: `"${customer.name} (Myra Foods)" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📦 New Order Received: ${orderId}`,
      html: createAdminEmailBody(orderId, customer, pricing, items),
      replyTo: customer.email, // Optional: makes it easy to reply directly to the customer
    });
    
    console.log(`✅ Order ${orderId} processed and emails sent.`);

    res.json({
      success: true,
      message: 'Order placed successfully!',
      orderId,
      timestamp,
    });

  } catch (error) {
    console.error('❌ Order processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place order',
      error: error.message,
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize server
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
