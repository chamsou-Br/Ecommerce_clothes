const { getTypesOfProducts, getStyleOfProducts } = require("../modals/products");
const { checkuser } = require("../middleware/auth");

const homeController = async (req , res) => {
    const types = await getTypesOfProducts();
    const user  = req.client
    res.render("home",{types,user});
}

module.exports = homeController