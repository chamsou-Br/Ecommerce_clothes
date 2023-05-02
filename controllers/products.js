const { getProductsByType, getTypesOfProducts, getMarkOfProducts, getStyleOfProducts, getProductById, getAllProduct, getExamplairOfProduct, updateProduct, addProduct } = require("../modals/products");
const titles = require("../public/data/titles")
const colors = require("../public/data/color");
const { getAllAccessoires } = require("../modals/accessoire");
const { getTypesOfCombinations } = require("../modals/combination");

const productsController = async (req , res) => {
    const type = req.params.type;
    const products = await getProductsByType(type);
    const marks = await getMarkOfProducts()
    const styles = await getStyleOfProducts();
    const types = await getTypesOfProducts();
    const typesCom = await getTypesOfCombinations()
    res.render("allProduct",{isProduct : true,products,marks,styles,types ,typesCom, info : titles[type],user : req.client});
}

const productDetailsController = async (req , res) => {
    const id = req.params.id
    const product = await getProductById(id)
    const items = await getExamplairOfProduct(id);
    const accs = await getAllAccessoires();
    const types = await getTypesOfProducts();
    const typesCom = await getTypesOfCombinations()
    res.render("details",{isCombination : false,types,typesCom,product : {...product , items : items},colors ,user:req.client,accs : accs});
}

const updateProductContrller = async (req , res) => {
try {
    const data = req.body
    console.log("update")
    await updateProduct(data);
    res.redirect("/gerant/produits");
} catch (error) {
    res.redirect("/login");
}
}

const addProductContrller = async (req , res) => {
    try {
        const data = req.body
        console.log(data)
        await addProduct(data,req.file.filename)
        res.redirect("/gerant/produits");
    } catch (error) {
        res.redirect("/login");
    }
    }


module.exports = {productsController,productDetailsController , updateProductContrller , addProductContrller}