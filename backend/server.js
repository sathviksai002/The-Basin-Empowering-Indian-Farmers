const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // You'll need to install this package using npm install nodemailer

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// POST endpoint for handling form submission
app.post('/Contact-Us', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '2010030361@klh.edu.in', 
            pass: 'Sathvik+190'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: '2010030361@klh.edu.in',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ status: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ status: 'Email sent successfully' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
