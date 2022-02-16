const express = require("express");
const router = express.Router();

const Famouses = require('../models/Famous');

router.get('/', async (req, res) => {
	await Famouses.find().exec((err, famous) => {
		res.send(famous);
	});
});

router.post('/', async (req, res) => {
	await Famouses.insertMany({
        pinUrl: req.body.pinUrl,
        pinKeyword: req.body.pinKeyword
	}, (err, res) => {
		if (err) throw err;
	});
	await Famouses.find().exec((err, famous) => {
		if (famous.length === 9) { //최대 8개까지만 저장
			Famouses.deleteOne().exec((err, del) => {
				res.send(del);
			});
		}
	});
});


module.exports = router;