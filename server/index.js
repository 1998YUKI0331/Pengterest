const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 8080;

mongoose.connect('mongodb://yuki:1234@localhost:27017/yuki', (err) => {
	if (err) { console.log(err.message); } 
  	else { console.log('Succesfully Connected'); }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());

const PinRouter = require('./routes/PinRouter');
const UserRouter = require('./routes/UserRouter');
const FamousRouter = require('./routes/FamousRouter');

app.use('/pin', PinRouter);
app.use('/user', UserRouter);
app.use('/famous', FamousRouter);

app.listen(PORT, () => { console.log(`Listen : ${PORT}`); });