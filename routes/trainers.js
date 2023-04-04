// Express modules imports
const express = require('express');
const router = express.Router();

// Custom modules & API imports
const { Trainer, validate } = require('../models/trainer');

// Create a new trainer
router.post('/', async (req, res) => {
	// Case 400 checking
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Match case
	let trainer = new Trainer(req.body);
	trainer = await trainer.save();
	res.send(trainer);
});

// Get all the trainers
router.get('/', async (req, res) => {
	const trainers = await Trainer.find();
	// Case 404 checking
	if (!trainers) return res.status(404).send('Dont have trainers yet !');
	res.send(trainers);
});

// Get to specific trainer data for trainers users (for e.g after login case)
router.get('/login/:userId', async (req, res) => {
	// @TODO Case 404 checking
	// @TODO Match case
});

// Get the trainer data for any users
router.get('/:id', async (req, res) => {
	const trainer = await Trainer.findById(req.params.id).populate({
		path: 'events',
		select: '-__v',
		model: 'Event',
	});
	// Case 404 checking
	if (!trainer)
		return res
			.status(404)
			.send('The trainer with the given id was not found !');

	// Match case
	res.send(trainer);
});

// Update an existing trainer by her id
router.put('/:id', async (req, res) => {
	// Case 400 checking
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	// Case 404 checking
	if (!trainer)
		return res.status(404).send('The event with the given ID was not found.');

	// Match case
	res.send(trainer);
});

// Deleting an existing trainer
router.delete('/:id', async (req, res) => {
	const trainer = await Trainer.findByIdAndRemove(req.params.id);
	// Case 404 checking
	if (!trainer)
		return res.status(404).send('The trainer with the given ID was not found.');
	// Match case
	res.send(trainer);
	// @TODO - Remove the user from firebase
});

module.exports = router;
