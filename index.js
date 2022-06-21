require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

(() => mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Mongoose connected successfully!')))();

const { userRouter } = require('./router');

app.use('/user', userRouter);

app.use('/', async (req, res) => {
  res.status(200).send('Welcome to Tilaka CRUD API!');
});

app.listen(process.env.PORT, () => console.log(`API Running at PORT: ${process.env.PORT}`));
