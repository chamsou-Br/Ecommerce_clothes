const { getAllAccessoires } = require("../modals/accessoire");
const { getAllCombinations } = require("../modals/combination");
const { getAllCommande, updateStatusCommande, getCommandeByID } = require("../modals/commande");
const { getAllProduct, getTypesOfProducts } = require("../modals/products");
const { getAllUsers } = require("../modals/user");
const  nodemailer= require("nodemailer")

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD_MAIL
  }
});

const commandesPageController = async (req, res) => {
  const commande = await getAllCommande();

  res.render("gerant/commandes", {
    commande: commande
  });
};

const usersPageController = async (req, res) => {
  const users = await getAllUsers();

  res.render("gerant/users", {
    users: users
  });
};

const productsPageController = async (req, res) => {
  const products = await getAllProduct();
  res.render("gerant/products", {
    products: products
  });
};

const accessoirePageController = async (req, res) => {
  const combinations = await getAllCombinations(); 
  const accessoires = await getAllAccessoires();
  res.render("gerant/accessoires", {
    accessoires: accessoires
  });
};

const commaneDetailsController = async (req , res) => {
  const id  = req.params.id ? req.params.id : 0
  const {products  , accessoires,combinations , ...user } = await getCommandeByID(id);


  res.render("gerant/commandeDetails",{user,products : products ,accessoires : accessoires,combinations : combinations });
}


const combinationsPageController = async (req , res) => {
  const combinations = await getAllCombinations(); 
  const types  =await getTypesOfProducts();
  const products = await getAllProduct();

  res.render("gerant/combinations",{combinations ,types, products  });
}

const updateCommandeStatusController = async (req  , res) => {
    const id = req.query.id;
    const status = req.query.status
    const commande = await getCommandeByID(id);
    if (!status || !id) res.redirect("/gerant/commandes");
    const mailOptions = {
      from: process.env.MAIL,
      to:  commande.email,
      subject: "L'atelier de la Mode",
      text: status == "	COMPLETE" ? 'Votre commande était accepté , Soyez prêt pour l’arrivée de votre commande' : 'Votre commande était annulé a cause des régle de notre boutique'
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
    });

    await updateStatusCommande(id,status)
    res.redirect("/gerant/commandes");
} 



module.exports = { commandesPageController , combinationsPageController ,accessoirePageController, productsPageController ,  usersPageController , updateCommandeStatusController , commaneDetailsController};
