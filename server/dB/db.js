const {connect, Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

connect("mongodb+srv://admin:mongodbadmin@cluster0.wma6eln.mongodb.net/Paytm2");

const userSchema = new Schema({
   username : {
      type : String,
      required : true,
      unique : true,
      trim : true,
      minLength : 3,
      maxLength : 30
   },
   password : {
      type : String,
      required : true,
      minLength : 6,
      trim : true
   },
   firstName : {
      type : String,
      required : true,
      trim : true,
      minLength : 3
   },
   lastName : {
      type : String,
      maxLength : 30,
      trim : true
   }
});

userSchema.methods.createHash = async (plainTextPassword) => {
   try { 
   const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(plainTextPassword,salt);
   } catch (err) {
      return err;
   }
}

userSchema.methods.validatePassword = async function (uncheckedPassword) {
   const ans =  await bcrypt.compare(uncheckedPassword,this.password);
   return ans;
}

const User = model("user",userSchema);

const accountSchema = new Schema ({
   userId : {
      type : Schema.Types.ObjectId,
      ref : User,
      required : true,
   },
   balance : {
      type : Number,
      required : true
   }
})

const Account = model("account",accountSchema);

module.exports = {
   User,
   Account
}
