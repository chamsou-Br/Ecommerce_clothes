const { changePicture, getUser } = require("../modals/user");
const { createCookie } = require("./auth");

const modifyPictureController = (req , res) => {
    changePicture(req.file.filename,req.client.email);
    const client = getUser(req.client.email);
    req.client = client;
    res.redirect("/profile")
}

module.exports = {modifyPictureController}