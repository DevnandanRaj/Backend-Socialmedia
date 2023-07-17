
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    password: String
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;

//{
 //   "name":"DevnandanRaj",
 //   "email":"devraj@gmail.com",
  //  "gender":"male",
  //  "password":"1234"
    
//}