const { getAllCommande, updateStatusCommande, getCommandeByID } = require("../modals/commande");

const commandesPageController = async (req, res) => {
  const commande = await getAllCommande();

  res.render("commandes", {
    commande: commande
  });
};

const commaneDetailsController = async (req , res) => {
  const id  = req.params.id
   const {products  , accessoires , ...user } = await getCommandeByID(id);
  res.render("commandeDetails",{user,products : products ,accessoires : accessoires });
}

const updateCommandeStatusController = async (req  , res) => {
    const id = req.query.id;
    const status = req.query.status
    if (!status || !id) res.redirect("/gerant/commandes");
    await updateStatusCommande(id,status)
    res.redirect("/gerant/commandes");
} 

module.exports = { commandesPageController , updateCommandeStatusController , commaneDetailsController};
