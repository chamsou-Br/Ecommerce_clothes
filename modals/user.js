const pool = require("../db");

const getUser = async (email , password ) => {
   const client =  (await pool.query("select * from client where email = $1",[email])).rows
   if (client.length == 0) {
    return null
   }else {
    return client[0]
   }

}

module.exports = { getUser }