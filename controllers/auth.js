const { getUser, addUser } = require("../modals/user")
const bcrypt = require("bcrypt")
const { createToken, createCookie, checkuser, removeCookie } = require("../middleware/auth")


const loginPageController = (req , res) => {

    res.render('login',{message : null}) 

}

const loginHandlerController = async (req , res ) => {

    const client = await getUser(req.body.email);
    if (client) {
        console.log(client)
        const auth = await bcrypt.compare(req.body.password,client.motdepasse )
            if (auth) {
              if (client.type == "admin") {
                const token = await createToken(client,process.env.JWT_SECRET,process.env.JWT_ACCESS_TOKEN_EXPIRES)
                createCookie(res,token,'accessTokenAdmin',process.env.ACCESS_TOKEN_COOKIE_EXPIRES);
                res.redirect('/gerant/commandes');
              }else {
                const token = await createToken(client,process.env.JWT_SECRET,process.env.JWT_ACCESS_TOKEN_EXPIRES)
                createCookie(res,token,'accessToken',process.env.ACCESS_TOKEN_COOKIE_EXPIRES);
                res.redirect('/');
              }

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


const registerController = (req , res) => {
    res.render("register",{message : null});
}


const registerHandlerController = async (req , res) => {
    console.log("body",req.body)
    const {firstName , lastName , email , address , password , phone} = req.body;
    const client = await getUser(email);
    if (client) {
        res.render("register",{message : 'Cet e-mail a déjà été enregistré'});
    }else {
        if (password.length < 8 || password.length > 12) {
            res.render("register",{message : 'Mot de passe non valide'});
        }else {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password,salt)
            await addUser(firstName , lastName , email , address , hashPassword , phone)
            const client = await getUser(email);
            const token = await createToken(client,process.env.JWT_SECRET,process.env.JWT_ACCESS_TOKEN_EXPIRES)
            createCookie(res,token,'accessToken',process.env.ACCESS_TOKEN_COOKIE_EXPIRES);
            req.body = {};
            res.redirect('/');

        }

    }

    


}
module.exports = { loginHandlerController , loginPageController , logoutController , registerController , registerHandlerController}


