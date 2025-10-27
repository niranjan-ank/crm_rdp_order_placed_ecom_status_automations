const nodemailer = require('nodemailer');

async function sendEmailReport(status, testDetails = '') {
  try {
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: 'niranjankumar.a@honebi.com', // Your email directly here
        pass: 'your_gmail_app_password_here' // Your app password directly here
      }
    });
    
    const mailOptions = {
      from: 'niranjankumar.a@honebi.com',
      to: 'niranjankumar.a@honebi.com',
      subject: `Playwright Test Results: ${status}`,
      html: `
        <h2>Test Execution Report</h2>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Execution Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Details:</strong> ${testDetails}</p>
        <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
        <br>
        <p>This email was sent automatically from Playwright test runner.</p>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to niranjankumar.a@honebi.com');
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = { sendEmailReport };