const express = require("express");

const app = express();
const PORT = 8000;

app.listen(PORT,()=>{
    console.log("success")
})

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', { name: 'World'  , data : [ 
        [0,1,2,3,5,6,7,8,9],
        [0,1,2,3,5,6,7,8,9],
        [0,1,2,3,5,6,7,8,9]
    ]});
});

app.get("/details/:id",(req , res) => {
    res.render("details");
})
app.get("/vestes",(req , res) => {
    res.render("allProduct")
})

app.get("/profile",(req , res) => {
    res.render("profile")
})
