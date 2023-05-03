const { json } = require("express");
const { addCommande } = require("../modals/commande");
const { getTypesOfProducts, getProductById } = require("../modals/products");
const  nodemailer= require("nodemailer");
const { getTypesOfCombinations, getCombinationsByType, getCombinationById } = require("../modals/combination");

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD_MAIL
    }
  });

 const bagController = async (req , res) => {
    const types = await getTypesOfProducts();
    const typesCom = await getTypesOfCombinations()
    const user  = req.client
    req.session.bag = req.session.bag ? req.session.bag : []
    req.session.accessoire = req.session.accessoire ? req.session.accessoire : []
    req.session.combinations = req.session.combinations ? req.session.combinations : []
    let price = 0 ;
    req.session.combinations.forEach(it=>{
        price += it.com.prix * it.qty;
    })
    req.session.accessoire.forEach(it => {
        price += it.accessoire.prix * it.qty
    })
    req.session.bag.forEach(it => {
        price += it.product.prix * it.qty
        it.accessoire.forEach(it2 => {
            price += it2.prix
        })
    })
    res.render("bag",{types,typesCom,user,bag : req.session.bag ,accessoires : req.session.accessoire ,com : req.session.combinations,  price : price });
}

const deleteBagController = async (req , res) => {
    const id = req.params.id
    req.session.bag.splice(id, 1)
    res.redirect("/bag")
}

const deleteAccessoireFromProductController = async (req , res) => {
    const id = req.query.id
    const acc = req.query.acc
    console.log(id , acc)
    req.session.bag[id].accessoire.splice(acc, 1) 
    res.redirect("/bag")
}

const deleteComFromBagController = async (req , res) => {
    const id = req.params.id
    req.session.combinations.splice(id, 1)
    res.redirect("/bag")
}

const deleteAccessoireFromBagController = async (req , res) => {
    const id = req.params.id
    req.session.accessoire.splice(id, 1)
    res.redirect("/bag")
}


const addBagController = async (req , res) => {
    const id = req.params.id
    const product = await getProductById(id);
    const color = req.body.color || 0
    const size = req.body.size || "S";
    let bags = req.session.bag
    let accessoireStringfy = req.body.accessoire ? req.body.accessoire :  [] ;
    let accessoire = []
    await accessoireStringfy.forEach(item => {
        accessoire.push(JSON.parse(item))
    });

    if (bags) {
        let isExiste = false
        let index = 0;
        // verify if existe 
        while (!isExiste && index < bags.length) {
            if (bags[index].product.id == product.id && bags[index].size == size && bags[index].color == color) {
                req.session.bag[index] = {...bags[index] ,qty : bags[index].qty + 1  , accessoire : [...bags[index].accessoire , ...accessoire]}
                isExiste = true
            }
            index++;
        }

        if (isExiste == false) {
            req.session.bag = [...bags , {qty : 1 , product : product , color , size , accessoire : accessoire }]
        }

    }else {
        req.session.bag = [{qty : 1 , product : product ,  color , size , accessoire : accessoire}]
    }

    res.redirect("/bag")
}


  function compareArrays(array1, array2) {
    if (array1.length !== array2.length) {
      return false;
    }
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
  }

  
const addCombinationToBagController = async (req , res) => {
    const id = req.params.id;
    const com = await getCombinationById(id);
    let combinations = req.session.combinations ? req.session.combinations : [];

    const {color , size} = req.body;
    let isExiste = false
    let index = 0;
    // verify if existe 
    while (!isExiste && index < combinations.length) {
        if (combinations[index].com.id == com.id && compareArrays(combinations[index].size,size) && compareArrays(combinations[index].color,color)  ) {
            isExiste = true
        }
        index++;
    }
    index --;
    if (isExiste == true) {
        req.session.combinations[index] = {...combinations[index] ,qty : combinations[index].qty + 1}
    }else{
        req.session.combinations = [...combinations,{qty : 1 , com : com ,  color , size }]
    }
    res.redirect("/bag")
}

const valideBagController = async (req , res) => {
    const products = req.session.bag ? req.session.bag : []
   const accs = req.session.accessoire ? req.session.accessoire : []
   const client = req.client ? req.client.email : null
   const combinations = req.session.combinations ? req.session.combinations : []
   console.log("client",client);
    await addCommande(req.body,products,accs,client,combinations)
    const mailOptions = {
        from: process.env.MAIL,
        to:  req.body.email,
        subject: "L'atelier de la Mode",
        text: 'Votre commande dans notre boutique est ajoutée avec succès'
      };
    
    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       console.log(error);
    //     }
    //   });
    req.session.accessoire = []
    req.session.bag  = []
    req.session.combinations  = []
    res.redirect("/bag")
}
module.exports = {bagController,deleteComFromBagController , addBagController ,addCombinationToBagController, deleteBagController , deleteAccessoireFromProductController ,deleteAccessoireFromBagController,valideBagController}