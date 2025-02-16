const bcrypt = require('bcrypt');
const { UserModel } = require('../../model/user.model');

module.exports = {
    hashPassword: async function(plainPassword) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
            return hashedPassword;
        } catch (error) {
            console.error('Error hashing password:', error);
            throw error;
        }
    },
    verifyPassword: function(plainPassword, hashedPassword) {
        return bcrypt.compareSync(plainPassword, hashedPassword)
    },
    isEmailExist: async function(email) {
        const user = await UserModel.findOne({
            email
        })
        return user !== null
    },
    isUsernameExist: async function(username) {
        const user = await UserModel.findOne({
            username
        })
        return user !== null
    }
}