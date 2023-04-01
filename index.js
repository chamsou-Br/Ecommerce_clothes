const express = require("express");
const homeController = require("./controllers/home");
const { productsController, productDetailsController } = require("./controllers/products");
const {getAllProduct , getProductsByType} = require("./modals/products");

const app = express();
const PORT = 8000;

app.listen(PORT,()=>{
    console.log("success")
})

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', homeController);

app.get("/produit/details/:id",productDetailsController)
app.get("/produit/:type",productsController);

app.get("/profile",(req , res) => {
    res.render("profile")
})
