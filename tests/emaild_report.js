const fs = require('fs');
const pdfParse = require('pdf-parse');
const nodemailer = require('nodemailer');

// Regex for emails
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;

// Extract emails from PDF
async function getCompaniesFromPDF(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(dataBuffer);
  const lines = data.text.split('\n');

  const companies = lines
    .map(line => {
      const emailMatch = line.match(emailRegex);
      return emailMatch ? { email: emailMatch[0] } : null;
    })
    .filter(Boolean);

  return companies;
}

(async () => {
  const companies = await getCompaniesFromPDF('Banglore IT Companies List.pdf');

  // Setup Nodemailer transporter (use App Password for Gmail!)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'niranjankumar.a@honebi.com',
      pass: 'report' // ⚠️ replace with Google App Password
    }
  });

  const subject = "Application for software developer - 'Your Name'";
  const body = `
Hi,

I hope this email finds you well. This is 'Your Name' graduated from 'Your college'.

I am writing to express my interest in the software developer position at your company.

Warm regards,
'Your Name'
'Phno: zzz'
'https://www.linkedin.com/in/xxx/'
  `;

  for (const company of companies) {
    try {
      await transporter.sendMail({
        from: '"Niranjan" <niranjankumar.a@honebi.com>',
        to: company.email,
        subject: subject,
        text: body
      });

      console.log(`✅ Sent email to ${company.email}`);
    } catch (error) {
      console.error(`❌ Failed to send email to ${company.email}: ${error.message}`);
    }
  }
})();
