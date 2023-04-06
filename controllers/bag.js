const { getTypesOfProducts } = require("../modals/products");

 const bagController = async (req , res) => {
    const types = await getTypesOfProducts();
    const user  = req.client
    res.render("bag",{types,user,bag : true});
}

module.exports = {bagController}