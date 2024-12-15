// const Unique = require('faker/lib/unique');
// const { string, required } = require('joi');
const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const passportLocalMongoose= require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
      type: String, // Use 'String' (capitalized)
      required: true,
      unique: true, // Use 'unique' instead of 'Unique'
    },
  });
UserSchema.plugin(passportLocalMongoose);
module.exports= mongoose.model('User',UserSchema);
