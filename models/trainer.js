// Modules imports
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// Trainer model
const Trainer = mongoose.model(
	'Trainer',
	new mongoose.Schema({
		userId: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			min: 2,
			max: 20,
			required: true,
		},
		lastName: {
			type: String,
			min: 2,
			max: 20,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			lowercase: true,
			required: true,
		},
		events: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Event',
			default: [],
		},
		description: {
			type: String,
			max: 300,
			default: '',
		},
		image: {
			type: String,
			min: 0,
			default: '',
		},
	})
);

// Trainer schema validator function
const validateTrainer = trainer => {
	const schema = Joi.object({
		_id: Joi.objectId(),
		userId: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{28}$')),
		firstName: Joi.string().min(1).required(),
		lastName: Joi.string().min(2).required(),
		email: Joi.string().email({ minDomainSegments: 2 }).required(),
		events: Joi.array().items(Joi.objectId()).default([]),
		description: Joi.string().max(300).default(''),
		image: Joi.string().min(0).default(''),
	});
	return schema.validate(trainer);
};

exports.validate = validateTrainer;
exports.Trainer = Trainer;
