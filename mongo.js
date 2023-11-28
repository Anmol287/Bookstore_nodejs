const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let schema = new Schema({
 "email": String,
  "pass": String,
})

var dotenv=require('dotenv').config({path: __dirname + '/.env'})
var url=process.env.mongo_url;
let User;
console.log(url)
function initialise(){
  let db = mongoose.createConnection(url)
  
  return new Promise((resolve, reject)=>{
    db.on('err', (err) => {
      console.log("Error: ", err);
      reject();
    })
    db.once('open',()=>{
      User = db.model("users", schema);
      resolve();
    })
  })
}

function registeruser(userData){
    console.log(userData)
    initialise().then(()=>{
        let user1 = new User(userData)
        console.log(user1)
        user1.save((err)=>{
            if(err)
            {console.log("The user is already present")}
            else if(err){
                console.log("error is creating user")
            }
        })
    })
}
function getuser(Email,Pass){
    return new Promise((resolve, reject) => {
        initialise().then(()=>{
            User.find({email:Email}).exec().then((data)=>{
              if(data[0].pass==Pass){
                resolve(true)
              }
            })
            .catch((err)=>{
               reject(err)
            })
        })
    })
}

module.exports = { registeruser,getuser};
