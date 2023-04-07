// Modules imports
const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);

const Event = mongoose.model(
	'Event',
	new mongoose.Schema({
		category: {
			type: String,
			min: 3,
			max: 12,
			required: true,
		},
		trainer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Trainer',
			required: true,
		},
		date: {
			type: String,
			length: 10,
			required: true,
		},
		hour: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			min: 2,
			max: 45,
			required: true,
		},
		city: {
			type: String,
			min: 2,
			max: 25,
			required: true,
		},
		participants: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Trainee',
			default: [],
		},
		maxParticipants: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		description: {
			type: String,
			min: 10,
			max: 50,
			required: true,
		},
	})
);

const validateEvent = event => {
	const schema = Joi.object({
		category: Joi.string().min(3).max(12).required(),
		trainer: Joi.objectId().required(),
		date: Joi.string().length(10).required(),
		hour: Joi.string().length(5).required(),
		address: Joi.string().min(2).max(45).required(),
		city: Joi.string().min(2).max(45).required(),
		maxParticipants: Joi.number().required(),
		participants: Joi.array().items(Joi.objectId()).default([]),
		description: Joi.string().min(10).max(200).required(),
		price: Joi.number().min(0).required(),
	});
	return schema.validate(event);
};

exports.Event = Event;
exports.validate = validateEvent;
