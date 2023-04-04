// Modules imports
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const Trainee = mongoose.model(
	'Trainee',
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
		registeredEvents: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Event',
			default: [],
		},
		favoriteTrainers: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Trainers',
			default: [],
		},
		image: {
			type: String,
			min: 0,
			default: '',
		},
	})
);

const validateTrainee = trainee => {
	const schema = Joi.object({
		_id: Joi.objectId(),
		userId: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{28}$')),
		firstName: Joi.string().min(2).required(),
		lastName: Joi.string().min(2).required(),
		email: Joi.string().email({ minDomainSegments: 2 }).required(),
		registeredEvents: Joi.array().items(Joi.objectId()).default([]),
		favoriteTrainers: Joi.array().items(Joi.objectId()).default([]),
		image: Joi.string().min(0),
	});
	return schema.validate(trainee);
};

exports.Trainee = Trainee;
exports.validate = validateTrainee;
