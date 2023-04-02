const pool = require("../db");

const getUser = async (email) => {
   const client =  (await pool.query("select * from client where email = $1",[email])).rows
   if (client.length == 0) {
    return null
   }else {
    return client[0]
   }
}

const addUser = async (firstName , lastName , email , address , password , phone) => {
   const client =  await pool.query("INSERT INTO client (type, nom, prenom, email, adresse, telephone, motDePasse, picture ) VALUES ('client',$1,$2,$3,$4,$5,$6,$7)",[lastName,firstName,email,address,phone,password,'https://th.bing.com/th/id/OIP.8-24d462Al7n2nEWHu6AvAHaE8?w=296&h=184&c=7&r=0&o=5&dpr=1.1&pid=1.7'])
   return client;
}

const changePicture = async (picture , email) => {
   await pool.query("UPDATE client SET picture = $1 WHERE email = $2",["uploads/"+picture,email])
}

module.exports = { getUser  , addUser , changePicture}