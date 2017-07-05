const config = require('config-lite')(__dirname);
const mongoose = require('mongoose');
const moment = require("moment");
const objectIdToTimestamp = require('objectid-to-timestamp');
const Schema = mongoose.Schema;
mongoose.connect(config.mongodb);

const UserSchema = new Schema({
    name: String,
    access:String,
    password:String,
    gender:{type:String,enum:['m','f','x']},
    avatar:String,
    bio:String
})
UserSchema.index({ access: 1 }, { unique: true }).exec();
UserSchema.index({ name: 1 }).exec();
exports.User = mongoose.model('User',UserSchema);

