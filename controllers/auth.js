const { getUser } = require("../modals/user")
const bcrypt = require("bcrypt")
const { createToken, createCookie, checkuser, removeCookie } = require("../middleware/auth")


const loginPageController = (req , res) => {

    res.render('login',{message : null})
}

const loginHandlerController = async (req , res ) => {

    const client = await getUser(req.body.email);
    if (client) {
        const auth = await bcrypt.compare(req.body.password,client.motdepasse )
            if (auth) {
              // Passwords match, redirect to home page
              const token = await createToken(client,process.env.JWT_SECRET,process.env.JWT_ACCESS_TOKEN_EXPIRES)
              createCookie(res,token,'accessToken',process.env.ACCESS_TOKEN_COOKIE_EXPIRES);
              res.redirect('/');
            } else {
              // Passwords don't match
              res.render('login', { message: 'E-mail ou mot de passe non valide' });
            }
    }else {
        res.render('login', { message: 'E-mail ou mot de passe non valide' });
    }
}

const logoutController = (req,res) => {
    removeCookie(res);
    res.redirect("/login")
}

module.exports = { loginHandlerController , loginPageController , logoutController}


