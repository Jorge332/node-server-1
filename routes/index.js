const express = require('express');
const path = require('path');
const router = express.Router()
const Subscriber = require('../models/subscriber.model')

//get all
router.get('/', async (req, res) => {
   res.sendFile( path.join(__dirname, '../views','index.html'))
})

module.exports = router;