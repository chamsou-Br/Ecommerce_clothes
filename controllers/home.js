const { getTypesOfProducts, getStyleOfProducts, getProductsByType } = require("../modals/products");
const { checkuser } = require("../middleware/auth");
const { getAllCombinations, getCombinationById, getTypesOfCombinations } = require("../modals/combination");
const { getCommandeByID } = require("../modals/commande");

const homeController = async (req , res) => {
    const types = await getTypesOfProducts();
    const user  = req.client
    const vests  = await getProductsByType("vest");
    const pantalons = await getProductsByType("pantalon");
    const typesCom = await getTypesOfCombinations()
    res.render("home",{types,typesCom,user,vests : vests.slice(0,10),pantalons : pantalons.slice(0,10)});
}

module.exports = homeController