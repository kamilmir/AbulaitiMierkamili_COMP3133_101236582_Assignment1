const { EmployeeModel } = require("../../model/employee.model")

module.exports = {
    isEmployeeEmailExist: async function(email) {
        const employee = await EmployeeModel.findOne({
            email
        })
        return employee !== null
    }
}