const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Activation de votre compte',
    html: `
      <h2>Activation de votre compte</h2>
      <p>Cliquez sur le bouton ci-dessous pour vérifier votre email et activer votre compte:</p>
      <a href="http://localhost:5000/api/verify-email/${token}" style="background-color: green; color: white; padding: 10px; text-decoration: none;">Activer mon compte</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
