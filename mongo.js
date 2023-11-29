const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let schema = new Schema({
  "email": String,
  "pass": String,
})

let User;

function initialise() {
  let db = mongoose.createConnection('mongodb+srv://anmol:ckOBxdk5RdxbSy6u@cluster0.p4kxybw.mongodb.net/test')
  return new Promise((resolve, reject) => {
    db.on('err', (err) => {
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
  return getuser(userData.email, userData.pass)
    .then((existingUser) => {
      if (existingUser) {
        console.log("User already exists");
        throw new Error("User already exists");
      } else {
        let user1 = new User(userData);
        return user1.save();
      }
    })
    .finally(() => {
      mongoose.connection.close();
    });
}

function getuser(email, pass) {
  return initialise().then(() => {
    return User.findOne({ email: email }).exec().then((user) => {
      if (user && user.pass === pass) {
        return true; // User found and password matches
      } else {
        return false; // User not found or incorrect password
      }
    }).catch((err) => {
      console.error("Error finding user:", err);
      throw err;
    }).finally(() => {
      mongoose.connection.close();
    });
  });
}

module.exports = { registeruser, getuser };
