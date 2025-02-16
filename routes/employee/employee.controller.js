require('dotenv').config()
const express = require('express');
const { EmployeeModel } = require('../../model/employee.model');
const router = express.Router();
const validate = require('./employee.validation')
const httpStatus = require('http-status');
const { isEmployeeEmailExist } = require('./employee.service');

router.post('/', validate.post, async function(req, res, next) {
    const {first_name: firstName, last_name: lastName, email, position, salary, date_of_joining: dateOfJoining, department} = req.body

    if (await isEmployeeEmailExist(email)) {
        return next(new Error('Employee email already existed!'))
    }

    const employee = new EmployeeModel({
        firstName,
        lastName,
        email,
        position,
        salary,
        dateOfJoining,
        department,
    })

    const savedEmployee = await employee.save()
    res.status(httpStatus.CREATED).json({
        message: 'Employee created successfully',
        employee_id: savedEmployee.id
    })
})

router.get('/', async function(req, res, next) {
    const allEmployees = await EmployeeModel.find({})
    res.json(allEmployees)
})

router.get('/:employeeId', async function(req, res, next) {
    try {
        const { employeeId } = req.params
        const employee = await EmployeeModel.findById(employeeId)
        if (!employee) {
            return next(new Error('Employee not found!'))
        }
        res.json(employee)
    } catch (error) {
        next(error)
    }
})

router.put('/:employeeId', validate.put, async function(req, res, next) {
    try {
        const { employeeId } = req.params
        const body = req.body
        const employee = await EmployeeModel.findById(employeeId)
        if (!employee) {
            return next(new Error('Employee not found!'))
        }

        Object.keys(body).forEach(key => {
            employee[key] = body[key]
        })

        await employee.save()
        res.json(employee)
    } catch (error) {
        next(error)
    }
})

router.delete('/', validate.delete, async function(req, res, next) {
    try {
        const { eid } = req.query
        await EmployeeModel.deleteOne({
            _id: eid
        })
        res.json({
            message: 'Employee deleted successfully'
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router;
