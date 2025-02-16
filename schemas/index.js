const { signup, login } = require('../routes/user/user.graphql')
const { getAllEmployee, addEmployee, searchEmployeeById, updateEmployee, deleteEmployee, findByDepartmentOrDesignation } = require('../routes/employee/employee.graphql')

module.exports = {
    schema: `
        type Query {
            hello(name: String): Greeting
            signup: SignupResponse
            login(username: String!, password: String!): LonginResponse
            getAllEmployee: [Employee]
            searchEmployeeById(eid: String!): Employee
            findEmployeeByDepartmentOrDesignation(department: String, designation: String): [Employee]
        }

        type Mutation {
            signup(username: String!, email: String!, password: String!): SignupResponse
            addEmployee(firstName: String!, lastName: String!, email: String!, position: String!, salary: Float!, dateOfJoining: String!, department: String!, gender: String!): Employee
            updateEmployee(eid: String!, firstName: String, lastName: String, email: String, position: String, salary: Float, dateOfJoining: String, department: String, gender: String): Employee
            deleteEmployee(eid: String!): String
        }

        type SignupResponse {
            message: String
            username: String
            email: String
        }

        type Greeting {
          message: String
          timestamp: String
        }

        type LonginResponse {
            message: String
            token: String
        }

        type Employee {
            id: String
            firstName: String
            lastName: String
            email: String
            gender: String
            position: String
            salary: Float
            dateOfJoining: String
            department: String
        }

        type DeleteResponse {
            message: String
        }
        
    `,
    resolvers: {
        hello: ({name}) => {
          return {
            message: 'Hello ' + name,
            timestamp: new Date().toISOString()
          };
        },
        signup: async ({username, email, password}) => {
            const signUpResult = await signup({username, email, password})
            const { username: usernameResult, email: emailResult } = signUpResult
            return {
                message: 'Signup successfully',
                username: usernameResult,
                email: emailResult
            }
        },
        login: async ({username, password}) => {
            const { message, token } = await login({username, password})
            return {
                message,
                token
            }
        },
        getAllEmployee: async ({}) => {
            const employees = await getAllEmployee()
            return employees
        },

        addEmployee: async ({firstName, lastName, email, position, salary, dateOfJoining, department, gender}) => {
            const employee = await addEmployee({firstName, lastName, email, position, salary, dateOfJoining, department, gender})
            return employee
        },

        searchEmployeeById: async ({eid}) => {
            const employee = await searchEmployeeById({eid})
            return employee
        },

        updateEmployee: async ({eid, firstName, lastName, email, position, salary, dateOfJoining, department, gender}) => {
            const employee = await updateEmployee({eid, firstName, lastName, email, position, salary, dateOfJoining, department, gender})
            return employee
        },

        deleteEmployee: async ({eid}) => {
            const message = await deleteEmployee({eid})
            return message
        },

        findEmployeeByDepartmentOrDesignation: async ({department, designation}) => {
            const employees = await findByDepartmentOrDesignation({department, designation})
            return employees
        }
    }
}