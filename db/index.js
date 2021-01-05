const connection = require("./connection");



module.exports = {
    getDepartment() {
        return connection.query( "SELECT * FROM department");
    },

    getRoles() {
        return connection.query( "SELECT * FROM role");
    },
    getEmployees() {
        return connection.query( "SELECT * FROM employees");
    }

};