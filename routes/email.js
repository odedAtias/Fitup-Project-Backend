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
			user: 'fitup.help@gmail.com',
			pass: 'nhtqlxhxynsenriu',
		},
	});

	const mailOptions = {
		from: 'fitup.help@gmail.com',
		to: email,
		subject: subject,
		text: text,
		replyTo: 'fitup.help@gmail.com',
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
	const { email, subject, text } = req.body;
	try {
		// call sendEmail function
		await sendEmail(email, subject, text);

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
