const pool = require("../db");

const getAllProduct = async () => {
  try {
    const products = (await pool.query("select * from produit ")).rows;
    const examplaires = (await pool.query("select * from examplaire ")).rows;
    const data = [];
    for (let i = 0; i < products.length; i++) {
      const ex = examplaires.filter(
        (examplaire) => examplaire.produit == products[i].id
      );
      data.push({ ...products[i], items: ex });
    }
    return data;
  } catch (error) {
    console.log(error, "err");
    return [];
  }
};

const getProductsByType = async (type) => {
  try {
    const products = (
      await pool.query("select * from produit where type = $1 order by id", [
        type,
      ])
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
        data.prix,
      ]
    );
  } catch (error) {
    console.log(error);
  }
};

const getMarkOfProducts = async () => {
  try {
    const marks = (await pool.query("SELECT DISTINCT marque FROM produit"))
      .rows;
    return marks;
  } catch (error) {
    return [];
  }
};

const getStyleOfProducts = async () => {
  try {
    const styles = (await pool.query("SELECT DISTINCT style FROM produit"))
      .rows;
    return styles;
  } catch (error) {
    return [];
  }
};

const getTypesOfProducts = async () => {
  try {
    const types = (await pool.query("SELECT DISTINCT type FROM produit")).rows;
    return types;
  } catch (error) {
    return [];
  }
};

const getExamplairOfProduct = async (id) => {
  try {
    const examplaires = (
      await pool.query("SELECT * FROM examplaire where produit = $1", [id])
    ).rows;
    return examplaires;
  } catch (error) {
    return [];
  }
};

const updateProduct = async (data) => {
  let qty = 0;
  await data.itemsId.forEach(async (it, index) => {
    qty +=
      parseInt(data["S"][index]) +
      parseInt(data["M"][index]) +
      parseInt(data["L"][index]) +
      parseInt(data["XL"][index]) +
      parseInt(data["XXL"][index]);
    await pool.query(
      "UPDATE examplaire SET quantites = $1, quantitem = $2 , quantitel = $3  , quantitexl = $4 , quantitexxl = $5   WHERE id = $6",
      [
        parseInt(data["S"][index]),
        parseInt(data["M"][index]),
        parseInt(data["L"][index]),
        parseInt(data["XL"][index]),
        parseInt(data["XXL"][index]),
        parseInt(it),
      ]
    );
  });
  await pool.query(
    "UPDATE produit SET nom = $1, type = $2 , style = $3  , marque = $4 ,prix = $5 , quantite = $6  WHERE id = $7",
    [data.name, data.type, data.style, data.mark, data.price, qty, data.id]
  );
};

module.exports = {
  getAllProduct,
  getProductsByType,
  updateProduct,
  getProductById,
  addProduct,
  getMarkOfProducts,
  getStyleOfProducts,
  getTypesOfProducts,
  getExamplairOfProduct,
};
