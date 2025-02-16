require('dotenv').config()
const express = require('express');
const { EmployeeModel } = require('../../model/employee.model');
const router = express.Router();
const validate = require('./employee.validation')
const httpStatus = require('http-status');
const { isEmployeeEmailExist } = require('./employee.service');

module.exports = {
    getAllEmployee: async function() {
        const allEmployees = await EmployeeModel.find({})
        return allEmployees
    },

    addEmployee: async function({firstName, lastName, email, position, salary, dateOfJoining, department, gender}) {
    
        if (await isEmployeeEmailExist(email)) {
            throw new Error('Employee email already existed!')
        }

        if (salary < 1000) {
            throw new Error('Salary must be greater than or equal to 1000!')
        }

        if (gender !== 'male' && gender !== 'female' && gender !== 'other') {
            throw new Error('Gender must be male or female or other!')
        }
    
        const employee = new EmployeeModel({
            firstName,
            lastName,
            email,
            position,
            salary,
            dateOfJoining,
            department,
            gender
        })
    
        const savedEmployee = await employee.save()
        return {
            message: 'Employee created successfully',
            ...savedEmployee.toJSON()
        }
    },

    searchEmployeeById: async function({eid}) {
        const employee = await EmployeeModel.findById(eid)
        if (!employee) {
            throw new Error('Employee not found!')
        }
        return employee
    },

    updateEmployee: async function({eid, firstName, lastName, email, position, salary, dateOfJoining, department, gender}) {
        const employee = await EmployeeModel.findById(eid)
        if (!employee) {
            throw new Error('Employee not found!')
        }
        const { eid: id, ...rest } = arguments[0]
        Object.keys(rest).forEach(key => {
            if (rest[key]) {
                employee[key] = rest[key]
            }
        })
        await employee.save()
        return employee
    },

    deleteEmployee: async function({eid}) {
        const employee = await EmployeeModel.findByIdAndDelete(eid)
        if (!employee) {
            throw new Error('Employee not found!')
        }
        return 'Employee deleted successfully'
    },

    findByDepartmentOrDesignation: async function({department, designation}) {
        const employees = await EmployeeModel.find({
            $or: [
                { department },
                { designation }
            ]
        })
        return employees
    }
}