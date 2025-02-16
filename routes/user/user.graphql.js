require('dotenv').config()
const express = require('express');
const { UserModel } = require('../../model/user.model');
const { hashPassword, isUsernameExist, isEmailExist, verifyPassword } = require('./user.service');
const router = express.Router();
const validate = require('./user.validation')
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY

module.exports = {
    signup: async function({ username, email, password }) {
      
        if (await isUsernameExist(username)) {
          throw new Error('Username dupplicated!')
        }
      
        if (await isEmailExist(email)) {
          throw new Error('Email dupplicated!')
        }
        
        const user = new UserModel({
          username,
          email,
          password: await hashPassword(password)
        })
        return user.save()
      },
      login: async function({ username, password }) {
        const user = await UserModel.findOne({
          username
        })
      
        if (!user) {
          throw new Error('Username not exist!')
        }
      
        if (!verifyPassword(password, user.password)) {
          throw new Error('Password incorrect!')
        }
            
        const token = jwt.sign({id: user.id, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, secretKey)
        return {
            message: 'Login successfully',
            token
          }
      }
}