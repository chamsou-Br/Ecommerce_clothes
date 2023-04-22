const pool = require("../db");

const getAllAccessoires = async () => {
    try {
      const accessoire = (await pool.query("select * from accessoire")).rows;
      return accessoire;
    } catch (error) {
      console.log(error, "err");
      return [];
    }
  };

  const getAccessoireById = async (id) => {
    try {
      const accessoire = (
        await pool.query("select * from accessoire where id = $1", [id])
      ).rows;
      return accessoire[0];
    } catch (error) {
      console.log(error, "err");
      return [];
    }
  };

  const getMarkOfAccessoires = async() => {
    try {
      const marks = (await pool.query("SELECT DISTINCT marque FROM accessoire")).rows
      return marks
    } catch (error) {
      return []
    }
  }

  const updateAccessoire = async (data) => {
    try {
      await pool.query("UPDATE accessoire SET marque = $1, type = $2 , prix = $3 , quantite = $4  WHERE id = $5",
      [data.mark,data.type,data.price,data.qty,data.id])
    } catch (error) {
      console.log(error)
    }
  }

  module.exports = {getAccessoireById , getAllAccessoires , getMarkOfAccessoires , updateAccessoire}