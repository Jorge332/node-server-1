
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }
const express = require('express');
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to database'));

const app = express()
app.use(express.json())

const subs = require('./subscribers/subs')
app.use('/subs', subs)

app.listen(3001, () => console.log('server Started'))