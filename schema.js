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

module.exports = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    })
});

