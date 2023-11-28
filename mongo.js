const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let schema = new Schema({
  "email": String,
  "pass": String,
})
// var dotenv = require('dotenv').config({ path: __dirname + '/.env' })
//   var url = process.env.mongo_url;

require('dotenv').config({ path: __dirname + '/.env' })

let User;

function initialise() {
  
  let db = mongoose.createConnection(process.env.mongo_url)
  return new Promise((resolve, reject) => {
    db.on('error', (err) => {
      console.log("Error: ", err);
      reject();
    })
    db.once('open', () => {
      User = db.model("users", schema);
      resolve();
    })
  })
}

function registeruser(userData) {
  initialise().then(() => {
    let user1 = new User(userData)
    user1.save((err) => {
      
      if (err) { 
        console.log("The user is already present") 
      }
      else if (err) {
        console.log("error is creating user")
      }
    })
  })
}
function getuser(Email, Pass) {
  return new Promise((resolve, reject) => {
    initialise().then(() => {
      User.findOne({ email: Email }).exec().then((data) => {
        if (data && data.pass === Pass) {
           resolve(true);
        } else {
           resolve(false); // User not found or incorrect password
        }
        mongoose.connection.close();
      }).catch((err) => {
          reject(err)
        })
    })
  })
}

module.exports = { registeruser, getuser };
