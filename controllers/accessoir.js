const { getMarkOfAccessoires, getAllAccessoires, getAccessoireById, updateAccessoire, addAccessoire, deleteAccessoire } = require("../modals/accessoire");
const { getTypesOfCombinations } = require("../modals/combination");
const { getTypesOfProducts } = require("../modals/products");

const accessoiresController = async (req , res) => {

    const accessoire = await getAllAccessoires();
    const marks = await getMarkOfAccessoires()
    const types = await getTypesOfProducts();
    const typesCom = await getTypesOfCombinations()
    res.render("accessoire",{accessoire,marks,types ,typesCom, user : req.client});
}

const deleteAccessoireController = async (req , res) => {
    if (req.params.id ) {
        console.log(req.params.id);
        await deleteAccessoire(parseInt(req.params.id))
    }
    res.redirect("/gerant/accessoires")
}

const addAccessoireToBagController = async (req , res) => {
    const id = req.params.id
    const accessoire = await getAccessoireById(id);
    let bags = req.session.accessoire
    if (bags) {
        let isExiste = false
        let index = 0;
        while (!isExiste && index < bags.length) {
            if (bags[index].accessoire.id == accessoire.id ) {
                req.session.accessoire[index] = {...bags[index] ,qty : bags[index].qty + 1 }
                isExiste = true
            }
            index++;
        }
        if (isExiste == false) {
            req.session.accessoire = [...bags , {qty : 1 , accessoire : accessoire }]
        }

    }else {
        req.session.accessoire = [{qty : 1 , accessoire : accessoire }]
    }

    res.redirect("/bag")
}

const updateAccessoireContrller = async (req , res) => {
    const data = req.body
    await updateAccessoire(data);
    res.redirect("/gerant/accessoires");
}

const addAccessoireContrller = async (req , res) => {
    const data = req.body
    await addAccessoire(data,req.file.filename)
    res.redirect("/gerant/accessoires");
}

module.exports = {accessoiresController , deleteAccessoireController,addAccessoireContrller ,addAccessoireToBagController , updateAccessoireContrller}