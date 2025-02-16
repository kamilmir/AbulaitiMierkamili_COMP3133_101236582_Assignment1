require('dotenv').config()
const express = require('express');
const { UserModel } = require('../../model/user.model');
const { hashPassword, isUsernameExist, isEmailExist, verifyPassword } = require('./user.service');
const router = express.Router();
const validate = require('./user.validation')
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY

router.post('/login', validate.login, async function(req, res, next) {
  const { username, password } = req.body
  const user = await UserModel.findOne({
    username
  })

  if (!user) {
    return next(new Error('Username not exist!'))
  }

  if (!verifyPassword(password, user.password)) {
    return next(new Error('Password incorrect!'))
  }

  console.log(secretKey)

  const token = jwt.sign({id: user.id, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, secretKey)
  return res.status(httpStatus.OK).json({
    message: 'Login successfully',
    jwt_token: token
  })
});

router.post('/signup', validate.signup, async function(req, res, next) {
  const { username, email, password } = req.body

  if (await isUsernameExist(username)) {
    return next(new Error('Username dupplicated!'))
  }

  if (await isEmailExist(email)) {
    return next(new Error('Email dupplicated!'))
  }
  
  const user = new UserModel({
    username,
    email,
    password: await hashPassword(password)
  })
  const saveduser = await user.save()
  res.status(httpStatus.CREATED).json(saveduser)
});

module.exports = router;
