const { getTypesOfProducts } = require("../modals/products");

const profileController = async (req , res) => {
    if (!req.client) {
        res.redirect("/login")
    }
    const types = await getTypesOfProducts();
    const user = req.client
    res.render("profile",{types,user})
}

module.exports = profileController;