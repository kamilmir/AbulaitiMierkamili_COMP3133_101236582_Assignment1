var express = require('express');
var router = express.Router();

const users = require('./user/user.controller')
const employee = require('./employee/employee.controller')

router.get('/', function(req, res, next) {
  res.json({
    date: new Date()
  })
});

router.use('/user', users)
router.use('/emp/employees', employee)

module.exports = router;
