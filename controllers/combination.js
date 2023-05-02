const { getTypesOfCombinations, getCombinationsByType, addCombination, deleteCombination, getCombinationById } = require("../modals/combination");
const { getTypesOfProducts } = require("../modals/products");
const titles = require("../public/data/titles")
const colors = require("../public/data/color");

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
    res.redirect("/gerant/combinaisons")
}

const deleteCombinaisonController = async (req , res) => {
    if (req.params.id ) {
        console.log(req.params.id);
        await deleteCombination(parseInt(req.params.id))
    }
    res.redirect("/gerant/combinaisons")
}

const combinationDetailsController = async (req , res) => {
    const id = req.params.id
    const com = await getCombinationById(id)
    const types = await getTypesOfProducts();
    const typesCom = await getTypesOfCombinations()
    //res.redirect("/combinaison/base")
    res.render("details",{isCombination : true,types,typesCom,product : com ,colors ,user:req.client});
}
module.exports = {combinationssController,combinationDetailsController,addCombinationController , deleteCombinaisonController}