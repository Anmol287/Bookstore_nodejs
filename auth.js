// const fs = require("fs");
const mongo = require("./mongo.js");
let login = false;
let cartarray = []
let databook = []
function auth(email, pass) {
  //data = require("D:\\Study\\Mern Stack\\New folder\\Bookstore\\database.json")
  // console.log(data["Anmol"])
  //when using json
  //   if (data[email] == pass) {
  //     console.log("Authorization Granted");
  //     login = true;
  //     return true;
  //   } else {
  //     console.log("Intruder detected");
  //     return false;
  //   }

  login = true;
  return mongo.getuser(email, pass)
}


function registeruser(data) {
  // data = require("D:\\Study\\Mern Stack\\New folder\\Bookstore\\database.json");
  // data[email] = pass;
  // let js = JSON.stringify(data);
  // fs.writeFile(
  //   "D:\\Study\\Mern Stack\\New folder\\Bookstore\\database.json",
  //   js,
  //   function () {
  //     console.log("data is entered");
  //   }
  // );
  // console.log("user registered");

  mongo.registeruser(data)
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

function cardempty(){
  if(cartarray.length==0){
    
  }
}


//  getbookdata()

//registeruser("anmol","12345")
module.exports = { auth, registeruser, getbookdata, isuserloggedin, logout, getcartitems, additem, removeitem, totalprice };
