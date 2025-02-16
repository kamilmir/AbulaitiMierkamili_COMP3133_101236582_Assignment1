var Validator = require('jsonschema').Validator;
var v = new Validator();
const httpError = require('http-errors');

module.exports = {
    post: function(req, res, next) {
        const schema = {
            type: 'object',
            // firstName, lastName, email, position, salary, dateOfJoining, department
            properties: {
                first_name: {
                    type: 'string',
                },
                last_name: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                },
                position: {
                    type: 'string',
                },
                salary: {
                    type: 'number',
                },
                date_of_joining: {
                    type: 'string',
                },
                department: {
                    type: 'string',
                }
            },
            required: ['first_name', 'last_name', 'email', 'position', 'salary', 'date_of_joining', 'department']
        }
        const isValid = v.validate(req.body, schema)
        if (!isValid.valid) {
            const errors = isValid.errors.map(error => error.message);
            return res.status(httpError.BadRequest().status).json({msg: errors.join(',')});
        }
        next()
    },
    put: function(req, res, next) {
        const schema = {
            type: 'object',
            // firstName, lastName, email, position, salary, dateOfJoining, department
            properties: {
                first_name: {
                    type: 'string',
                },
                last_name: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                },
                position: {
                    type: 'string',
                },
                salary: {
                    type: 'number',
                },
                date_of_joining: {
                    type: 'string',
                },
                department: {
                    type: 'string',
                }
            },
            additionalProperties: false
        }
        const isValid = v.validate(req.body, schema)
        if (!isValid.valid) {
            const errors = isValid.errors.map(error => error.message);
            return res.status(httpError.BadRequest().status).json({msg: errors.join(',')});
        }
        next()
    },
    delete: function(req, res, next) {
        const schema = {
            type: 'object',
            // firstName, lastName, email, position, salary, dateOfJoining, department
            properties: {
                eid: {
                    type: 'string',
                },
            },
            required: ['eid']
        }
        const isValid = v.validate(req.query, schema)
        if (!isValid.valid) {
            const errors = isValid.errors.map(error => error.message);
            return res.status(httpError.BadRequest().status).json({msg: errors.join(',')});
        }
        next()
    },
}