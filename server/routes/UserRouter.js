const express = require("express");
const router = express.Router();

const Users = require('../models/User');
const Pins = require('../models/Pin');

router.post('/', async (req, res) => {
    await Users.find({ userEmail: req.body.userEmail }).exec((err, user) => {
		if (user.length === 0) {
            Users.insertMany({
                userEmail: req.body.userEmail,
                userSavedPins: [],
                userCreatedPins: []
            }, (err, res) => {
                if (err) throw err;
            });
        }
        Users.find().exec((err, user) => {
            res.send(user);
        });
	});
});

router.post('/saved', async (req, res) => {
    await Pins.find({ pinId: req.body.pinId }).exec((err, pin) => {
        Users.findOneAndUpdate(
            { userEmail: req.body.userEmail },
            { $addToSet: { userSavedPins: pin[0] }})
            .exec();
        Users.findOne({ userEmail: req.body.userEmail }).select('userSavedPins').exec((err, user) => {
                res.send(user.userSavedPins);
            });
    });
});

router.get('/saved', async (req, res) => {
	await Users.find({ userEmail: req.query.userEmail }).select('userSavedPins').exec((err, user) => {
		res.send(user[0]);
	});
});

router.get('/created', async (req, res) => {
	await Users.find({ userEmail: req.query.userEmail }).select('userCreatedPins').exec((err, user) => {
		res.send(user[0]);
	});
});

module.exports = router;