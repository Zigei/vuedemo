const config = require('config-lite')(__dirname);
const mongoose = require('mongoose');
const moment = require("moment");
const objectIdToTimestamp = require('objectid-to-timestamp');
const Schema = mongoose.Schema;
mongoose.connect(config.mongodb);

mongoose.plugin('addCreatedAt',{
	afterFind:( results ) => {
		results.forEach((items) => {
			items.create_at = moment(objectIdToTimestamp(items._id)).format("YYYY-MM-DD HH-mm-ss");
		});
		return results;
	},
	afterFindOne:( result ) => {
		result.create_at = moment(objectIdToTimestamp(result._id)).format("YYYY-MM-DD HH-mm-ss");
		return result;
	}
})
// user 类
const UserSchema = new Schema({
	name: String,
	access: String,
	password: String,
	gender: {
		type: String,
		enum: ['m', 'f', 'x']
	},
	avatar: String,
	bio: String,
	birth: String
})
UserSchema.index({access: 1}, {unique: true});
UserSchema.index({name: 1});
exports.User = mongoose.model('User', UserSchema);

// times 计划类
const TimesShema = new Schema({
	author: mongoose.Types.ObjectId,
	comment:String,
	hours:Number,
	date:number
})
TimesShema.index({author:1}).exec();
TimesShema.index({_id:1},{unique:true}).exec();
exports.Times = mongoose.model('Times',TimesShema);