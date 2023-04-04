// Modules imports
const express = require('express');
const mongoose = require('mongoose');

// Custom routes imports
const events = require('./routes/events');
const trainers = require('./routes/trainers');
const trainees = require('./routes/trainees');

// App initializing
const app = express();
require('./startup/prod')(app);

// Connecting to the db
mongoose
	.connect(
		'mongodb+srv://odedatias1:AIaI2IDdHsIvYgVH@fitupcluster.hehwcmn.mongodb.net/?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log('Connected to FitUp DB ...'))
	.catch(() => console.error('Could not connect to FitUp DB ...'));

// App middlewares
app.use(express.json());
app.use('/api/events', events);
app.use('/api/trainers', trainers);
app.use('/api/trainees', trainees);

// Port initialize
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
