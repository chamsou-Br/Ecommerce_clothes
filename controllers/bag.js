const { getTypesOfProducts, getProductById } = require("../modals/products");

 const bagController = async (req , res) => {
    const types = await getTypesOfProducts();
    const user  = req.client
    res.render("bag",{types,user,bag : req.session.bag});
}

const deleteBagController = async (req , res) => {
    console.log(req.session.bag)
    const id = req.params.id
    console.log(id,req.session.bag)
    req.session.bag.splice(id, 1)
    console.log(id,req.session.bag)
    res.redirect("/bag")
}

const addBagController = async (req , res) => {
    const id = req.params.id
    const product = await getProductById(id);
    const color = req.body.color || 0
    const size = req.body.size || "S";
    let bags = req.session.bag
    if (bags) {
        let isExiste = false
        let index = 0;
        while (!isExiste && index < bags.length) {
            if (bags[index].product.id == product.id && bags[index].size == size && bags[index].color == color) {
                req.session.bag[index] = {...bags[index] ,qty : bags[index].qty + 1 }
                isExiste = true
            }
            index++;
        }
        if (isExiste == false) {
            req.session.bag = [...bags , {qty : 1 , product : product , color , size }]
        }

    }else {
        req.session.bag = [{qty : 1 , product : product ,  color , size}]
    }

    res.redirect("/bag")
}
module.exports = {bagController,addBagController , deleteBagController}