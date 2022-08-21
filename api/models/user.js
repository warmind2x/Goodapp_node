import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type:String, required:[true]},
    email: {type:String, required:[true]},
    password: {type:String, required:[true]},
    userId: {type:String, required:[true], unique:true},

});
userSchema.plugin(uniqueValidator, { message: 'Error, User already exists.'});
const User = mongoose.model('User', userSchema);
export default User;