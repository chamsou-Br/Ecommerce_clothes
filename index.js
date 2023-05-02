const express = require("express");
const homeController = require("./controllers/home");
const { productsController, productDetailsController, updateProductContrller, addProductContrller } = require("./controllers/products");
const {getAllProduct , getProductsByType} = require("./modals/products");
const { loginPageController, loginHandlerController, logoutController, registerController, registerHandlerController } = require("./controllers/auth");
const cookieParser = require("cookie-parser");
const { verifyAuth, verifyAuthAdmin } = require("./middleware/auth");
const {profileController,modifyPictureController, updateProfileController} = require("./controllers/profile");
const multer = require("multer");
const upload = require("./middleware/upload");
const { bagController, addBagController, deleteBagController, deleteAccessoireFromBagController, valideBagController, deleteAccessoireFromProductController, addCombinationToBagController } = require("./controllers/bag");
const session = require("express-session");
const { accessoiresController, addAccessoireToBagController, updateAccessoireContrller, addAccessoireContrller } = require("./controllers/accessoir");
const { commandesPageController, updateCommandeStatusController, commaneDetailsController, usersPageController, productsPageController, accessoirePageController, combinationsPageController } = require("./controllers/gerant");
const { combinationssController, addCombinationController, deleteCombinaisonController, combinationDetailsController } = require("./controllers/combination");

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
app.use(session({
    secret: 'Ecommerce', // Set your own secret key for session management
    resave: false,
    saveUninitialized: true
  }));

app.get('/',verifyAuth, homeController);

app.get("/produit/details/:id",verifyAuth,productDetailsController)
app.get("/produit/:type",verifyAuth,productsController);
app.get("/combinaison/:type",verifyAuth,combinationssController);
app.get("/combinaison/details/:id",verifyAuth,combinationDetailsController)
app.get("/accessoire",verifyAuth,accessoiresController)


app.get("/profile",verifyAuth,profileController)
app.post("/profile",verifyAuth,updateProfileController);

app.get("/login",loginPageController)
app.post("/login",loginHandlerController)
app.get("/logout",logoutController)
app.get("/register",registerController);
app.post("/register",registerHandlerController)

app.get("/bag",verifyAuth,bagController)
app.post('/bag',verifyAuth,valideBagController)
app.post("/bag/:id",verifyAuth,addBagController)
app.get("/bag/accessoire/:id",verifyAuth,addAccessoireToBagController)
app.post("/bag/combinaison/:id",verifyAuth,addCombinationToBagController)
app.get("/bag/delete/:id",verifyAuth,deleteBagController)
app.get("/bag/accessoire/delete/:id",verifyAuth,deleteAccessoireFromBagController)
app.get("/bag/product/accessoire/delete",verifyAuth,deleteAccessoireFromProductController)

app.get("/gerant/commandes",verifyAuthAdmin,commandesPageController)
app.get("/gerant/commandes/status",verifyAuthAdmin,updateCommandeStatusController)
app.get("/gerant/commandes/:id",verifyAuthAdmin,commaneDetailsController)
app.get("/gerant/utilisateurs",verifyAuthAdmin,usersPageController)
app.get("/gerant/produits",verifyAuthAdmin,productsPageController)
app.post("/gerant/produits",verifyAuthAdmin,updateProductContrller)
app.post("/gerant/produit",verifyAuthAdmin,upload.single("picture"),addProductContrller)
app.get("/gerant/accessoires",verifyAuthAdmin,accessoirePageController)
app.post("/gerant/accessoires",verifyAuthAdmin,updateAccessoireContrller)
app.post("/gerant/accessoire",verifyAuthAdmin,upload.single("picture"),addAccessoireContrller)
app.get("/gerant/combinaisons",verifyAuthAdmin,combinationsPageController)
app.post("/gerant/combinaisons",verifyAuthAdmin,addCombinationController)
app.get("/gerant/deletecombinaisons/:id",verifyAuthAdmin,deleteCombinaisonController)




app.post('/profile/upload', upload.single("picture"),verifyAuth,modifyPictureController);