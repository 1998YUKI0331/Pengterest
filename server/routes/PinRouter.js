const express = require("express");
const router = express.Router();

const Users = require('../models/User');
const Pins = require('../models/Pin');

router.post('/', async (req, res) => {
	await Pins.find().exec((err, pin) => {
		res.send(pin);
	});
});

router.post('/search', async (req, res) => {
	await Pins.find({ pinKeyword: req.body.pinKeyword }).exec((err, pin) => {
		res.send(pin);
	});
});

router.post('/created', async (req, res) => {
	await Pins.insertMany({
        pinId: req.body.pinId,
        pinUrl: req.body.pinUrl,
        pinCreator: req.body.pinCreator,
        pinKeyword: req.body.pinKeyword
	}, (err, res) => {
		if (err) throw err;
		if (req.body.pinCreator !== "admin") {
			Users.findOneAndUpdate(
				{ userEmail: req.body.pinCreator },
				{ $addToSet: { userCreatedPins: res[0] }})
				.exec();
		}
	});
	Pins.find().exec((err, pin) => {
		res.send(pin);
	});
});

module.exports = router;