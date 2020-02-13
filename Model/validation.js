const Joi = require('@hapi/joi');

const signUp = function(req, res, next) {
    const validData = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        contact: Joi.string().min(10).required(),
        password: Joi.string().min(6).required(),
        isOrganiser: Joi.boolean().optional()
    })
    const d = validData.validate(req.body);
    if(d.error){
        res.status(400).json({
            message: "Payload validation failed",
            error: d.error.details[0].message
        })
    }else {
        req.payloadValid = true
        next()
    }
}

const login = function(req, res, next) {
    const validData = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    })
    const d = validData.validate(req.body);
    if(d.error){
        res.status(400).json({
            message: "Payload validation failed",
            error: d.error.details[0].message
        })
    }else {
        req.payloadValid = true
        next()
    }
}

const createEvent = function(req, res, next) {
    const validData = Joi.object({
        title: Joi.string().required(),
        startTime: Joi.date().iso().required(),
        endTime : Joi.date().iso().greater(Joi.ref('startTime')).required(),
        venue: Joi.string(),
        description: Joi.string().optional(),
        contact: Joi.string().min(10).required(),
    })
    const d = validData.validate(req.body);
    if(d.error){
        res.status(400).json({
            message: "Payload validation failed",
            error: d.error.details[0].message
        })
    }else {
        req.payloadValid = true
        next()
    }
}

const getUserByEmail = function(req, res, next) {
    const validData = Joi.object({
        email: Joi.string()
    })
    const d = validData.validate(req.body);
    if(d.error){
        res.status(400).json({
            message: "Payload validation failed",
            error: d.error.details[0].message
        })
    }else {
        req.payloadValid = true
        next()
    }
}

module.exports = {
    signUp,
    login,
    createEvent,
    getUserByEmail
}