var Validator = require('jsonschema').Validator;
var v = new Validator();
const httpError = require('http-errors');

module.exports = {
    signup: function(req, res, next) {
        const schema = {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                }
            },
            required: ['username', 'password', 'email']
        }
        const isValid = v.validate(req.body, schema)
        if (!isValid.valid) {
            const errors = isValid.errors.map(error => error.message);
            return res.status(httpError.BadRequest().status).json({msg: errors.join(',')});
        }
        next()
    },
    login: function(req, res, next) {
        const schema = {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                }
            },
            required: ['username', 'password']
        }
        const isValid = v.validate(req.body, schema)
        if (!isValid.valid) {
            const errors = isValid.errors.map(error => error.message);
            return res.status(httpError.BadRequest().status).json({msg: errors.join(',')});
        }
        next()
    }
}