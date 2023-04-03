const { getProductsByType, getTypesOfProducts, getMarkOfProducts, getStyleOfProducts, getProductById, getAllProduct, getExamplairOfProduct } = require("../modals/products");
const titles = require("../public/data/titles")
const colors = require("../public/data/color")

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
    const types = await getTypesOfProducts();
    res.render("details",{types,product : {...product[0] , items : items},colors ,user:req.client});
}


module.exports = {productsController,productDetailsController}