const { removeCookie, createToken } = require("../middleware/auth");
const { getTypesOfProducts } = require("../modals/products");
const { changePicture, getUser, updateProfile } = require("../modals/user");
const { createCookie } = require("./auth");

const modifyPictureController = async(req , res) => {
    await changePicture(req.file.filename,req.client.email);
    const client = await getUser(req.client.email);
    const token = await createToken(client,process.env.JWT_SECRET,process.env.JWT_ACCESS_TOKEN_EXPIRES)
    res.cookie('accessToken', token);
    res.redirect("/profile")
}

const updateProfileController = async (req , res) => {
    const {firstName , lastName , email , address  ,newEmail, phone} = req.body
    await updateProfile(firstName , lastName , email , address  ,newEmail, phone);
    const client = await getUser(newEmail);
    const token = await createToken(client,process.env.JWT_SECRET,process.env.JWT_ACCESS_TOKEN_EXPIRES)
    res.cookie('accessToken', token);
    res.redirect("/profile")
}


const profileController = async (req , res) => {
    if (!req.client) {
        res.redirect("/login")
    }
    const types = await getTypesOfProducts();
    const user = req.client
    res.render("profile",{types,user})
}

module.exports = {profileController,modifyPictureController,updateProfileController};