// Modules imports
const express = require('express');
const router = express.Router();

// Custom modules & API imports
const {Trainee, validate} = require('../models/trainee');

// Create a new trainer
router.post('/', async (req, res) => {
	// Case 400 checking
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Match case
	let trainee = new Trainee(req.body);
	trainee = await trainee.save();
	res.send(trainee);
});

// Get all the trainees
router.get('/', async (req, res) => {
	const trainees = await Trainee.find();
	// Case 404 checking
	if (!trainees) return res.status(404).send('Dont have trainees yet !');
	// Match case
	res.send(trainees);
});

// Get to specific trainee data for trainers users (for e.g after login case)
router.get('/:userId', async (req, res) => {
	const trainee = await Trainee.findOne({userId: req.params.userId}).populate({
		path: 'favoriteTrainers',
		select: '-_userId -__v',
		model: 'Trainer',
	});
	// Case 404 checking
	if (!trainee)
		return res.status(404).send('The trainee with the given ID was not found.');
	// Match case
	res.send(trainee);
});

// Update an existing trainee
router.put('/:id', async (req, res) => {
	// Case 400 checking
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const trainee = await Trainee.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	// Case 404 checking
	if (!trainee)
		return res.status(404).send('The trainee with the given ID was not found.');
	// Match case
	res.send(trainee);
});

// Delete an existing trainee
router.delete('/:id', async (req, res) => {
	const trainee = await Trainee.findByIdAndRemove(req.params.id);
	// Case 404 checking
	if (!trainee)
		return res.status(404).send('The trainee with the given ID was not found.');
	// Match case
	res.send(trainee);
});

// Delete event from trainee
router.delete('/:id/:eid', async (req, res) => {
	const trainee = await Trainee.findOne({_id: req.params.id});

	// Case 404 checking
	if (!trainee)
		return res.status(404).send('The trainee with the given ID was not found.');

	const {
		firstName,
		lastName,
		email,
		favoriteTrainers,
		image,
		registeredEvents,
		timeStamp,
		height,
		weight,
	} = trainee;

	const events = registeredEvents.filter(e => {
		console.log(e._id.toString(), req.params.eid);
		return e._id.toString() !== req.params.eid;
	});

	const body = {
		firstName: firstName,
		lastName: lastName,
		email: email,
		favoriteTrainers: favoriteTrainers,
		registeredEvents: events,
		timeStamp: timeStamp,
	};
	// Updating the collection
	await Trainee.findByIdAndUpdate(req.params.id, body, {
		new: true,
	});
});

module.exports = router;
