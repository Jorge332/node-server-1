const express = require('express');
const router = express.Router()
const Subscriber = require('../models/subscriber.model')

//get all
router.get('/', async (req, res) => {
    try {
        const mySubscribers = await Subscriber.find()
        res.json(mySubscribers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//get one
router.get('/:id', getSingleSubscriber, (req, res) => {
    res.json(res.sub)
})
//Create 
router.post('/', async (req, res) => {
    try {
        const newSub = new Subscriber({
            name: req.body.name,
            subscribedToChannel: req.body.subscribedToChannel
        })

        const newSubResult = await newSub.save()
        res.status(201).json(newSubResult)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Edit
router.patch('/:id', getSingleSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.sub.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.sub.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSub = await res.sub.save();
        res.json(updatedSub)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete
router.delete('/:id', getSingleSubscriber, async (req, res) => {
    try {
        await res.sub.remove();
        res.json({ message: 'Deleted Successfuly' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Middleware
async function getSingleSubscriber(req, res, next) {
    let sub
    try {
        sub = await Subscriber.findById(req.params.id)
        if (sub == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.sub = sub
    next()
}

module.exports = router;