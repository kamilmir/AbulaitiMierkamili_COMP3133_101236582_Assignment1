const { Schema, default: mongoose, SchemaType } = require("mongoose");
const { connection }  = require("../common/connection")
const crypto = require("crypto")

const schema = new Schema({
    first_name: { type: Schema.Types.String, alias: 'firstName'},
    last_name: { type: Schema.Types.String, alias: 'lastName'},
    email: String,
    gender: String,
    position: String,
    salary: Number,
    date_of_joining: { type: Schema.Types.Date, alias: 'dateOfJoining'},
    department: String,
    employee_photo: { type: Schema.Types.String, alias: 'employeePhoto'},
    designation: String,
})


// Ensure virtual fields are serialized.
schema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        ret.firstName = ret.first_name;
        ret.lastName = ret.last_name;
        ret.dateOfJoining = ret.date_of_joining;
        ret.employeePhoto = ret.employee_photo;
        return ret;
    }
});

schema.set('toObject', {
    virtuals: true,
    transform: (doc, ret) => {
        ret.firstName = ret.first_name;
        ret.lastName = ret.last_name;
        ret.dateOfJoining = ret.date_of_joining;
        ret.employeePhoto = ret.employee_photo;
        return ret;
    }
});

const EmployeeModel = connection.model('Employee', schema)

module.exports = {
    EmployeeModel
}