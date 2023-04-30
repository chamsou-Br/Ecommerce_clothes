const { getTypesOfCombinations, getCombinationsByType, addCombination, deleteCombination } = require("../modals/combination");
const { getTypesOfProducts } = require("../modals/products");
const titles = require("../public/data/titles");

const combinationssController = async (req , res) => {
    const type = req.params.type;
    const com = await getCombinationsByType(titles[type].title);
    const types = await getTypesOfProducts();
    const typesCom = await getTypesOfCombinations()
    res.render("allCombinations",{combinations : com,types ,typesCom, info : titles[type],user : req.client});
}

const addCombinationController = async (req , res) => {
    const data = req.body;
    await addCombination(data.type , parseFloat(data.price),data.name , data.descr , data.products)
    console.log(data);
    res.redirect("/gerant/combinaisons")
}

const deleteCombinaisonController = async (req , res) => {
    if (req.params.id ) {
        await deleteCombination(parseInt(req.params.id))
    }
    res.redirect("/gerant/combinaisons")
}
module.exports = {combinationssController,addCombinationController , deleteCombinaisonController}