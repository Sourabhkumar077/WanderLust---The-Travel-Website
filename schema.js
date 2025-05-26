const Joi = require('joi');

module.exports = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.object({
            filename: Joi.string().required(),
            url: Joi.string().required(),
        }).required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required(),
});

