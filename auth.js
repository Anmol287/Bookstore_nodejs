const mongo = require("./mongo.js");
let login = false;
let cartarray = []
let databook = []


function auth(email, pass) {

  return mongo.getuser(email, pass)
    .then((isValidUser) => {
      login = isValidUser
      return login;
    })
    .catch((error) => {
      console.error("Authentication error:", error);
      return false;
    });
}

function registeruser(userData) {
  return mongo.getuser(userData.email, userData.pass)
    .then((userExists) => {
      if (userExists) {
        throw new Error("User already exists");
      }
      return mongo.registeruser(userData);
    })
}


function getbookdata() {
  let data1 = require("./bookdata.json");
  databook = data1.bookdata
  return databook;
}
function isuserloggedin() {
  return login;
}
function logout() {
  login = false;
  return login;
}

function getcartitems() {
  return cartarray
}


function additem(id) {
  for (let i = 0; i < databook.length; i++) {
    if (databook[i].id == id) {
      cartarray.push(databook[i])
    }
  }
}


function removeitem(id) {
  for (let i = 0; i < cartarray.length; i++) {
    if (cartarray[i].id == id) {
      cartarray.splice(i, 1); // optional: exit the loop after removing the item
    }
  }
}


function totalprice() {
  price = 0
  for (let i = 0; i < cartarray.length; i++) {
    price += cartarray[i].price
  }
  return price
}

module.exports = { auth, registeruser, getbookdata, isuserloggedin, logout, getcartitems, additem, removeitem, totalprice };
