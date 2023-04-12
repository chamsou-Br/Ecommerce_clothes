const pool = require("../db");
const size = require("../public/data/sizes")



const addCommande = async (data , products , accessoires,client )=> {
    try {

        const id = (await pool.query("SELECT * FROM commande")).rowCount + 1
        await pool.query(
            "INSERT INTO commande (id , email, nom, prenom, adresse, telephone, livraison , prix,client) values ( $1 , $2 , $3 , $4 , $5 , $6 ,$7,$8,$9)",
            [
              id,
              data.email,
              data.lastName,
              data.firstName,
              data.address,
              data.phone,
              data.date,
              data.price,
              client
            ]
          );
        products.forEach(async (product) => {
          switch (product.size) {
            case "S":
              await pool.query("UPDATE examplaire SET quantites = quantites - $1 WHERE produit = $2 and color = $3",
              [parseInt(product.qty),product.product.id,product.color])
              break;
            case "M":
              await pool.query("UPDATE examplaire SET quantitem = quantitem - $1 WHERE produit = $2 and color = $3",
              [parseInt(product.qty),product.product.id,product.color])
              break;
          
            case "L":
              await pool.query("UPDATE examplaire SET quantitel = quantitel - $1 WHERE produit = $2 and color = $3",
              [parseInt(product.qty),product.product.id,product.color])
              break;
          
            case "XL":
              await pool.query("UPDATE examplaire SET quantitexl = quantitexl - $1 WHERE produit = $2 and color = $3",
              [parseInt(product.qty),product.product.id,product.color])
              break;

              case "XXL":
                await pool.query("UPDATE examplaire SET quantitexxl = quantitexxl - $1 WHERE produit = $2 and color = $3",
                [parseInt(product.qty),product.product.id,product.color])
                break;

            default:
              break;
          }
            await pool.query(
                "INSERT INTO commandeProduits (commande, produit , qte , size , color) values ( $1 , $2 , $3 , $4 , $5)",
                [
                  id,
                  product.product.id,
                  product.qty,
                  product.size,
                  product.color
                ]
              );
              product.accessoire.forEach(async (acc) => {
                await pool.query("UPDATE accessoire SET quantite = quantite - $1 WHERE id = $2 ",
                [1,acc.id])
                  await pool.query(
                      "INSERT INTO commandeAccessoires (commande, accessoire  ,qte , produit) values ( $1 , $2 , $3 , $4)",
                      [
                        id,
                        acc.id,
                        1,
                        product.product.id
                      ]
                    );
              })
        });
        accessoires.forEach(async (acc) => {
          await pool.query("UPDATE accessoire SET quantite = quantite - $1 WHERE id = $2 ",
          [parseInt(acc.qty),acc.accessoire.id])
            await pool.query(
                "INSERT INTO commandeAccessoires (commande, accessoire , qte) values ( $1 , $2 , $3)",
                [
                  id,
                  acc.accessoire.id,
                  acc.qty,
                ]
              );
        });

        
    } catch (error) {
        console.log(error)
    }

}

module.exports =  { addCommande}