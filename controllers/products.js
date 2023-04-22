const { getProductsByType, getTypesOfProducts, getMarkOfProducts, getStyleOfProducts, getProductById, getAllProduct, getExamplairOfProduct, updateProduct } = require("../modals/products");
const titles = require("../public/data/titles")
const colors = require("../public/data/color");
const { getAllAccessoires } = require("../modals/accessoire");

const productsController = async (req , res) => {
    const type = req.params.type;
    const products = await getProductsByType(type);
    const marks = await getMarkOfProducts()
    const styles = await getStyleOfProducts();
    const types = await getTypesOfProducts();
    res.render("allProduct",{products,marks,styles,types , info : titles[type],user : req.client});
}

const productDetailsController = async (req , res) => {
    const id = req.params.id
    const product = await getProductById(id)
    const items = await getExamplairOfProduct(id);
    const accs = await getAllAccessoires();
    const types = await getTypesOfProducts();
    res.render("details",{types,product : {...product , items : items},colors ,user:req.client,accs : accs});
}

const updateProductContrller = async (req , res) => {
try {
    const data = req.body
    console.log("update")
    await updateProduct(data);
    res.redirect("/gerant/produits");
} catch (error) {
    console.log(error,"mm")
}
}


module.exports = {productsController,productDetailsController , updateProductContrller}