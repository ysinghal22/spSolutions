const router = require('express').Router();
const validation = require('../validation');

const Model = require('../../Model')//require('../users/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.post('/signup', validation.signUp, async (req, res, next) => {

    // check if user already exists
    const userExists =  await Model.users.findOne({email: req.body.email});

    if(userExists){
        res.status(409).json({message: "Email is already registered"})
    }

    // create new user
    try{
        // 1 create hash of password
        var hashPass = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPass

        // 2 save user data in DB with hashPass
        const userData = new Model.users(req.body)
        const user = await userData.save(userData)
        res.status(201).json({
            message: "SignUp Done!"
        })
    } catch(e) {
        res.staus(500).json({
            error: e.message
        })
    }
})

router.put('/login', validation.login, async (req, res) => {

    // check if user already exists
    const userExist =  await Model.users.findOne({email: req.body.email});

    if(!userExist){
        res.status(204).json({
            message: "Email doesn't exist"
        })
    }

    try{
        const valid = await bcrypt.compare(req.body.password, userExist.password)

        if(!valid){
            res.status(401).json({message: 'Wrong password'})
        }
        const token = jwt.sign({
            _id: userExist._id,
            email: userExist.email,
            role: userExist.role
        }, '*[A-Z]![0-9]~secretKey');

        await Model.users.findByIdAndUpdate({_id: userExist._id}, {accessToken: token}, {useFindAndModify: true})

        res.header('auth-token', token).json(
            {Login: "Success",token}
        );

    } catch(e) {
        console.log(e.message)
        res.status(400).json({error: e})
    }

})

module.exports = router