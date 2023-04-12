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

  module.exports = {getAccessoireById , getAllAccessoires , getMarkOfAccessoires}