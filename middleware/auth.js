const jwt = require("jsonwebtoken")

const verifyAuth = async (req , res , next) => {
  const client = await checkuser(req);
  if (client) {
    req.client = client
    next()
  }else {
    req.client = null
    next()
  }
}

const createToken = async (payload, secretKey, expiresIn) => {
  return jwt.sign(payload, secretKey, {expiresIn : expiresIn });
  };
  
  const checkuser = async (req) => {
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
}
  
  module.exports = { createToken , checkuser  , createCookie , removeCookie , verifyAuth}