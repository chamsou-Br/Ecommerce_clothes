const { getTypesOfProducts, getStyleOfProducts, getProductsByType } = require("../modals/products");
const { checkuser } = require("../middleware/auth");

const homeController = async (req , res) => {
    const types = await getTypesOfProducts();
    const user  = req.client
    const vests  = await getProductsByType("vest");
    const pantalons = await getProductsByType("pantalon");
    res.render("home",{types,user,vests : vests.slice(0,10),pantalons : pantalons.slice(0,10)});
}

module.exports = homeController