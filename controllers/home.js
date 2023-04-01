const { getTypesOfProducts } = require("../modals/products");

const homeController = async (req , res) => {
    const types = await getTypesOfProducts();
    res.render("home",{types});
} 

module.exports = homeController