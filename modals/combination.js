const pool = require("../db");
const { getExamplairOfProduct } = require("./products");


const getAllCombinations = async () => {
    try {
      const combinations = (await pool.query("select * from combinaison")).rows;
      const combinationsProducts = (await pool.query("select * from combinaisonProduit join produit on combinaisonProduit.produit = produit.id")).rows;
      const data = [];
      for (let i = 0; i < combinations.length; i++) {
        const ex = combinationsProducts.filter(
            (it) => it.combinaison == combinations[i].id
          );
          data.push({ ...combinations[i], items: ex });
      }
      return data;
    } catch (error) {
      console.log(error, "err");
      return [];
    }
  };

  const getCombinationsByType = async (type) => {
    try {
      const combinations = (await pool.query("select * from combinaison where type = $1",[type])).rows;
      const combinationsProducts = (await pool.query("select * from combinaisonProduit join produit on combinaisonProduit.produit = produit.id")).rows;
      const data = [];
      for (let i = 0; i < combinations.length; i++) {
        const ex = combinationsProducts.filter(
            (it) => it.combinaison == combinations[i].id
          );
          data.push({ ...combinations[i], items: ex });
      }
      return data;
    } catch (error) {
      console.log(error, "err");
      return [];
    }
  };

  const addCombination = async (type , price , name , descr , product) => {
   const id = (await pool.query("Insert into combinaison (nom , type , prix , descr ) values ($1 , $2 , $3 , $4) RETURNING id",[name,type,price,descr])).rows[0].id;
   product.map(async it => {
    await pool.query("Insert into combinaisonproduit  (combinaison , produit ) values ($1 , $2 )",[id,parseInt(it)])
   })
   console.log(id,"id")
  }
  
  const deleteCombination = async (id) => {
    await pool.query("delete from combinaisonproduit where combinaison = $1",[id])
    await pool.query("delete from combinaison where id = $1",[id])

  }

  const getCombinationById = async (id) => {
    try {
        const combinations = (await pool.query("select * from combinaison where id = $1",[id])).rows;
        const combinationsProducts = (await pool.query("select * from combinaisonProduit join produit on combinaisonProduit.produit = produit.id where combinaisonProduit.combinaison = $1",[id])).rows;
        const data = [];
        for (let i = 0; i < combinationsProducts.length; i++) {
            const ex = await getExamplairOfProduct(combinationsProducts[i].produit);
            data.push({ ...combinationsProducts[i], productsItems: ex });
        }
        return {...combinations[0],items : data};
      } catch (error) {
        console.log(error, "err");
        return null;
      }
  }

  const getTypesOfCombinations = async () => {
    try {
      const types = (await pool.query("SELECT DISTINCT type FROM combinaison")).rows;
      return types;
    } catch (error) {
      return [];
    }
  };
  


  module.exports = { getAllCombinations , addCombination, deleteCombination ,  getCombinationById , getTypesOfCombinations,getCombinationsByType}