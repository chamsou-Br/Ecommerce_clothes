const { json } = require("express");
const { addCommande } = require("../modals/commande");
const { getTypesOfProducts, getProductById } = require("../modals/products");
const  nodemailer= require("nodemailer")

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD_MAIL
    }
  });

 const bagController = async (req , res) => {
    const types = await getTypesOfProducts();
    const user  = req.client
    req.session.bag = req.session.bag ? req.session.bag : []
    req.session.accessoire = req.session.accessoire ? req.session.accessoire : []
    let price = 0 ;
    console.log(req.session.bag , req.session.accessoire)
    req.session.accessoire.forEach(it => {
        price += it.accessoire.prix * it.qty
    })
    req.session.bag.forEach(it => {
        price += it.product.prix * it.qty
        it.accessoire.forEach(it2 => {
            price += it2.prix
        })
    })
    res.render("bag",{types,user,bag : req.session.bag ,accessoires : req.session.accessoire , price : price });
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

const valideBagController = async (req , res) => {
    const products = req.session.bag ? req.session.bag : []
   const accs = req.session.accessoire ? req.session.accessoire : []
   const client = req.client ? req.client.email : null
    await addCommande(req.body,products,accs,client)
    const mailOptions = {
        from: process.env.MAIL,
        to:  req.body.email,
        subject: "L'atelier de la Mode",
        text: 'Votre commande dans notre boutique est ajoutée avec succès'
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        }
      });
    req.session.accessoire = []
    req.session.bag  = []
    res.redirect("/bag")
}
module.exports = {bagController,addBagController , deleteBagController , deleteAccessoireFromProductController ,deleteAccessoireFromBagController,valideBagController}