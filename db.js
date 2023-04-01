const Pool = require("pg").Pool

const pool = new Pool({
    user : "postgres",
    password : "2002",
    database : "Ecommerce",
    host : "localhost"
})

module.exports = pool;