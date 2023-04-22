const jwt = require("jsonwebtoken")

const verifyAuth = async (req , res , next) => {
  const client = await checkuser(req,res);
  if (client) {
    req.client = client
    next()
  }else {
    req.client = null
    next()
  }
}

const verifyAuthAdmin = async (req , res , next) => {
  const admin = await checkadmin(req,res);
  if (admin) {
    req.admin = admin
    next()
  }else {
    req.admin = null
    res.redirect('/login')
  }
}

const createToken = async (payload, secretKey, expiresIn) => {
  return jwt.sign(payload, secretKey, {expiresIn : expiresIn });
  };
  
  const checkuser = async (req,res) => {
    try {
      const token = req.cookies.accessToken;
      if (await token) {
        const encoded = jwt.verify(token, process.env.JWT_SECRET)
          if (encoded) {
            const { motdepasse, ...client } =  encoded;
            return client
          }
          else {
            return null
          }
      }
    } catch (error) {
      removeCookie(res)
      return null
    }

  };

  const checkadmin = async (req,res) => {
    try {
      const token = req.cookies.accessTokenAdmin;
      if (await token) {
        const encoded = jwt.verify(token, process.env.JWT_SECRET)
          if (encoded) {
            const { motdepasse, ...admin } =  encoded;
            return admin
          }
          else {
            return null
          }
      }
    } catch (error) {
      removeCookie(res)
      return null
    }

  };

  

  const createCookie = (res , token , name , expiresIn ) => {
    const cookieOption = {
        httpOnly: true,
        expires: new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "production" ? true : false
    };
    
    return res.cookie(name, token, cookieOption);
};

const removeCookie = (res) => {
  res.clearCookie('accessToken')
  res.clearCookie("accessTokenAdmin")
}
  
  module.exports = { createToken , checkuser  , checkadmin , createCookie , removeCookie , verifyAuth , verifyAuthAdmin}