const { Schema, default: mongoose, SchemaType } = require("mongoose");
const { connection }  = require("../common/connection")
const crypto = require("crypto")

const schema = new Schema({
    username: String,
    email: String,
    password: String,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

const UserModel = connection.model('User', schema)

module.exports = {
    UserModel
}