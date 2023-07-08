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
			unique: true,
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
		height: {
			type: Number,
			min: 140,
			max: 220,
		},
		weight: {
			type: Number,
			min: 30,
			max: 200,
		},
		timeStamp: {
			type: String,
			required: true,
			match: /^\d{2}\/\d{2}\/\d{4}$/,
		},
	})
);

// Trainer schemas validator function
const validateTrainer = trainer => {
	const schema = Joi.object({
		_id: Joi.objectId(),
		userId: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{28}$')),
		firstName: Joi.string().min(1).required(),
		lastName: Joi.string().min(2).required(),
		email: Joi.string().email({minDomainSegments: 2}).required(),
		events: Joi.array().items(Joi.objectId()).default([]),
		description: Joi.string().max(300).default(''),
		image: Joi.string().min(0).default(''),
		height: Joi.number().min(140).max(220),
		weight: Joi.number().min(30).max(200),
		timeStamp: Joi.string()
			.pattern(new RegExp('^\\d{2}/\\d{2}/\\d{4}$'))
			.required(),
	});
	return schema.validate(trainer);
};

exports.validate = validateTrainer;
exports.Trainer = Trainer;
