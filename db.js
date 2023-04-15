const Pool = require("pg").Pool

const pool = new Pool({
    user : "ecommerceclothes_salah",
    password : "salah2001",
    database : "ecommerceclothes_database",
    host : "postgresql-ecommerceclothes.alwaysdata.net"
})

module.exports = pool;