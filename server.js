const express = require("express");
const path = require("path");
let app = express();
const alert = require("alert");
const body_parser = require("body-parser");
app.use(body_parser.urlencoded({ extended: false }));
const checker = require("./auth.js");
app.use(express.static("images")); //use for register folder


app.get("/", function (req, res) {
  res.render(path.join(__dirname, "/login.hbs"));
});

//authentication is performed
app.post("/", (req, res) => {
  if (checker.auth(req.body.email, req.body.pass)) {
    bookdata = checker.getbookdata();
    res.render(path.join(__dirname, "/Bookstore.hbs"), { bookdata: bookdata });
  } else {
    alert("Wrong credential");
  }
});
app.get("/home", (req, res) => {
  //console.log(bookdata)
  if (checker.isuserloggedin() == true) {
    bookdata = checker.getbookdata();
    res.render(path.join(__dirname, "/Bookstore.hbs"), { bookdata: bookdata });
  } else {
    res.render(path.join(__dirname, "/404.hbs"));
  }
});

app.get("/about", (req, res) => {
  if (checker.isuserloggedin() == true) {
    res.render(path.join(__dirname, "/about.hbs"));
  }
  else {
    res.render(path.join(__dirname, "/404hbs"));
  }
});

app.get("/contact",(req,res)=>{
  res.render(path.join(__dirname,"contact.hbs"))
})

//cart ,add to cart 

app.get("/cart", (req, res) => {
  data = checker.getcartitems()
  if(data.length==0){
    res.render(path.join(__dirname,"/emptycart.hbs"))
  }
  else{
    //data = checker.getcartitems()
    price=checker.totalprice()
    res.render(path.join(__dirname, "/cart.hbs"), { cartitems: data , price: price})
  }
});

app.get("/additem/:id", (req, res) => {
  let idofproduct = req.params.id
  //console.log(idofproduct)
  checker.additem(idofproduct)
  res.redirect("/home")
})

app.get("/removeitem/:id", (req, res) => {
  let idofproduct = req.params.id
  checker.removeitem(idofproduct)
  res.redirect("/cart")
})

//creating registeration
app.get("/register", function (req, res) {
  res.render(path.join(__dirname, "/register.hbs"));
});

app.post('/register', function (req, res) {
    checker.registeruser(req.body)
    res.render(path.join(__dirname, "/login.hbs"))
})

app.get("/logout", (req, res) => {
  checker.logout();
  res.render(path.join(__dirname, "/login.hbs"));
})

app.listen(8000);
console.log("Server started");
