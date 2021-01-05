const util = require("util");
const mysql = require("mysql");
const inquirer = require("inquirer");
// const ascii_art = require("ascii-art");
const { connected } = require("process");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employeesDB"
});

connection.connect((err) => {
    if(err) throw err;
    console.log("Connected as id "+ connection.threadId);
});

connection.query = util.promisify(connection.query);

module.exports = connection;