const { getMarkOfAccessoires, getAllAccessoires, getAccessoireById } = require("../modals/accessoire");
const { getTypesOfProducts } = require("../modals/products");

const accessoiresController = async (req , res) => {

    const accessoire = await getAllAccessoires();
    const marks = await getMarkOfAccessoires()
    const types = await getTypesOfProducts();
    res.render("accessoire",{accessoire,marks,types , user : req.client});
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

module.exports = {accessoiresController , addAccessoireToBagController}