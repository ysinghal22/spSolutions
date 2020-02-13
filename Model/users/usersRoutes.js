const router = require('express').Router();

const Model = require('../../Model');
const Validation = require('../validation');
const VerifyToken = require('../verifyToken');


router.put('/edit', (req, res,next)=>{
    VerifyToken(req, res, next, 'User')
}, async (req, res)=>{
    try{
        const updatedDoc = await Model.users.findByIdAndUpdate(req.user._id, req.body, {new: true});
        res.status(200).json(updatedDoc)
    }catch (e){
        res.status(403).json(e)
    }

})


router.get('/getAll', (req, res,next)=>{
    VerifyToken(req, res, next, 'Admin')
}, async (req, res)=> {
    try{
        const allUsers = await Model.users.find({},{accessToken:0, password:0, __v:0});
        res.status(200).json(allUsers)
    } catch(e) {
        res.json(e)
    }
})

module.exports = router