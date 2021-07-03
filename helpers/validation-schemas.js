const Joi = require('joi');

const createUrlSchema = Joi.object({
    longUrl: Joi.string().uri().required(),
    redirect: Joi.any(),
});

module.exports = {
    createUrlSchema,
}