const router = require('express').Router();

const Model = require('../../Model');
const Validation = require('../validation');
const VerifyToken = require('../verifyToken');

// Create an Event (WORKING)
router.post('/create', (req, res,next)=>{
    VerifyToken(req, res, next, 'User')
},Validation.createEvent, async (req, res)=>{
    
    try{
        req.body.organiser = req.user._id
        const event = new Model.events(req.body)
        const newEvent = await event.save(event)
        res.status(201).json({
            newEvent
        })
    } catch(e) {
        res.status(402).json({error: e.message})
    }

})

// Edit event (WORKING)
router.put('/edit/:eventId', (req, res,next)=>{
    VerifyToken(req, res, next, 'User')
}, async (req, res)=>{
    try{

        const updatedDoc = await Model.events.findOneAndUpdate(
            {_id: req.params.eventId, organiser: req.user._id},
            req.body,
            {new: true, useFindAndModify:false});
        res.status(200).json(updatedDoc)
    }catch (e){
        res.status(403).json(e)
    }

})

// Get event by ID (WORKING)
router.get('/getEvent/:eventId',(req, res,next)=>{
    VerifyToken(req, res, next, null)
}, (req, res)=>{
    try{
        Model.events.findById(req.params.eventId).populate({
            path: 'organiser',
            select: "name"
        }).exec(function(err, users) {
            res.json(users)
        });
    } catch(e){
        res.json(e)
    }
} )

// Get all Events organised by particular Organiser (WORKING)
router.get('/getOrganisedEvent',(req, res,next)=>{
    VerifyToken(req, res, next, 'User')
}, (req, res)=>{
    try{
        Model.events.find({organiser: req.user._id}).populate({
            path: 'organiser',
            select: "name"
        }).exec(function(err, users) {
            res.json(users)
        });
    } catch(e){
        res.json(e)
    }
} )

// to get list of All events with respective organiser (WORKING)
router.get('/getAll', (req, res,next)=>{
    VerifyToken(req, res, next, null)
}, (req, res)=>{
    try{
        Model.events.find().populate({
            path: 'organiser',
            select: "name"
        }).exec(function(err, users) {
            res.json(users)
        });
    } catch(e){
        res.json(e)
    }
})

module.exports = router