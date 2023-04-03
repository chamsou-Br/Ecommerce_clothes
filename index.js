const express = require("express");
const homeController = require("./controllers/home");
const { productsController, productDetailsController } = require("./controllers/products");
const {getAllProduct , getProductsByType} = require("./modals/products");
const { loginPageController, loginHandlerController, logoutController, registerController, registerHandlerController } = require("./controllers/auth");
const cookieParser = require("cookie-parser");
const { verifyAuth } = require("./middleware/auth");
const {profileController,modifyPictureController, updateProfileController} = require("./controllers/profile");
const multer = require("multer");
const upload = require("./middleware/upload");

require('dotenv').config();

const app = express();
const PORT = 8000;

app.listen(PORT,()=>{
    console.log("success")
})

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());

app.get('/',verifyAuth, homeController);

app.get("/produit/details/:id",verifyAuth,productDetailsController)
app.get("/produit/:type",verifyAuth,productsController);

app.get("/profile",verifyAuth,profileController)
app.post("/profile",verifyAuth,updateProfileController);

app.get("/login",loginPageController)
app.post("/login",loginHandlerController)
app.get("/logout",logoutController)
app.get("/register",registerController);
app.post("/register",registerHandlerController)


app.post('/profile/upload', upload.single("picture"),verifyAuth,modifyPictureController);