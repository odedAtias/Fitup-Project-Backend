// Modules imports
const express = require('express');
const nodeMailer = require('nodemailer');
const router = express.Router();

const sendEmail = async (email, subject, text) => {
	const transporter = nodeMailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			from: 'fitup.help@gmail.com', // replace with your email address
			user: 'fitup.help@gmail.com',
			pass: 'nhtqlxhxynsenriu',
		},
	});

	const mailOptions = {
		from: 'fitup.help@gmail.com', // replace with your email address
		to: email, // replace with recipient email address
		subject: subject, // replace with email subject
		text : text, // replace with email content
	};

	// send email
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error occurred: ', error.message);
		} else {
			console.log('Email sent: ', info.response);
		}
	});
};

// Route to handle sending email
router.post('/', async (req, res) => {
	// get email and message data from request body

	try {
		// call sendEmail function
		await sendEmail();

		// send response indicating email was sent successfully
		res.status(200).send({ message: 'Email sent successfully!' });
	} catch (error) {
		// handle errors
		console.error(error);
		res.status(500).send({ error: 'Failed to send email' });
	}
});

// Export router
module.exports = router;
