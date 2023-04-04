// Express modules imports
const express = require('express');
const router = express.Router();

// Custom modules & API imports
const { Event, validate } = require('../models/event');
const { Trainer } = require('../models/trainer');

// Create a new event
router.post('/', async (req, res) => {
	// Case 400 checking
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Case 404 checking
	let trainer = await Trainer.findById(req.body.trainer);
	if (!trainer)
		return res.status(404).send('The trainer with the given ID was not found.');

	// Match case
	let event = new Event(req.body);
	event = await event.save();
	// Adding the new event to the events array of the relevant trainer & send to client
	trainer.events.push(event._id);
	trainer = await trainer.save();
	res.send(event);
});

// Get all the events
router.get('/', async (req, res) => {
	const events = await Event.find()
		.populate('trainer', 'firstName lastName')
		.populate({
			path: 'participants',
			select: 'firstName lastName image',
			model: 'Trainee',
		});
	// Case 404 checking
	if (!events) return res.status(404).send('Dont have trainers yet !');
	// Match case
	res.send(events);
});

// Get to specific event data
router.get('/:id', async (req, res) => {
	const event = await Event.findById(req.params.id);
	// Case 404 checking
	if (!event)
		return res.status(404).send('The event with the given ID was not found.');
	// Match case
	res.send(event);
});

// Update an existing event by her id
router.put('/:id', async (req, res) => {
	// Case 400 checking
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	// Case 404 checking
	if (!event)
		return res.status(404).send('The event with the given ID was not found.');

	// Match case
	res.send(event);
});

// Deleting an existing trainer
router.delete('/:id', async (req, res) => {
	const event = await Event.findByIdAndRemove(req.params.id);
	if (!event)
		return res.status(404).send('The event with the given ID was not found.');
	res.send(event);
});

module.exports = router;
