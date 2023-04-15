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
    await pool.query("INSERT INTO client (type, nom, prenom, email, adresse, telephone, motDePasse, picture ) VALUES ('client',$1,$2,$3,$4,$5,$6,$7)",[lastName,firstName,email,address,phone,password,'https://th.bing.com/th/id/OIP.zM3AofCh04TntLpcUe-dHAHaHa?pid=ImgDet&w=194&h=194&c=7&dpr=1.1'])
}

const changePicture = async (picture , email) => {
   await pool.query("UPDATE client SET picture = $1 WHERE email = $2",["uploads/"+picture,email])
}

const updateProfile = async (firstName , lastName , email , address  ,newEmail, phone)=>{
   await pool.query("UPDATE client SET nom = $1 , prenom = $2 , adresse = $3 , telephone =  $4 , email = $5 WHERE email = $6",[lastName,firstName,address,phone,newEmail,email])
}

module.exports = { getUser  , addUser , changePicture , updateProfile}