const pool = require("../db");

const getAllProduct = async () => {
  try {
    const products = (await pool.query("select * from produit")).rows;
    return products;
  } catch (error) {
    console.log(error, "err");
    return [];
  }
};

const getProductsByType = async (type) => {
  try {
    const products = (
      await pool.query("select * from produit where type = $1 order by id", [type])
    ).rows;

    return products;
  } catch (error) {
    console.log(error, "err");
    return [];
  }
};

const getProductById = async (id) => {
  try {
    const product = (
      await pool.query("select * from produit where id = $1", [id])
    ).rows;
    return product[0];
  } catch (error) {
    console.log(error, "err");
    return [];
  }
};

const addProduct = async (data) => {
  try {
    await pool.query(
      "INSERT INTO produit (type, nom, descr, style, catgorie, marque, quantite, accessoire, picture,prix) values ( $1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10)",
      [
        data.type,
        data.title,
        data.descr,
        data.style,
        data.categorie,
        data.marque,
        data.quantite,
        data.accessoire | NULL,
        data.picture,
        data.prix
      ]
    );
  } catch (error) {
    console.log(error);
  }
};

const getMarkOfProducts = async() => {
  try {
    const marks = (await pool.query("SELECT DISTINCT marque FROM produit")).rows
    return marks
  } catch (error) {
    return []
  }
}

const getStyleOfProducts = async() => {
  try {
    const styles = (await pool.query("SELECT DISTINCT style FROM produit")).rows
    return styles
  } catch (error) {
    return []
  }
}

const getTypesOfProducts = async () => {
  try {
    const types = (await pool.query("SELECT DISTINCT type FROM produit")).rows
    return types
  } catch (error) {
    return []
  }
}

const getExamplairOfProduct = async (id) => {
  try {
    const examplaires = (await pool.query("SELECT * FROM examplaire where produit = $1",[id])).rows
    return examplaires
  } catch (error) {
    return []
  }
}

module.exports = { getAllProduct, getProductsByType, getProductById , addProduct , getMarkOfProducts , getStyleOfProducts , getTypesOfProducts , getExamplairOfProduct} ;
