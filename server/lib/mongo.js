var config = require('config-lite')(__dirname);
var Mongoose = require('mongoose');
var mongoose = new Mongoose();
var moment = require("moment");
var objectIdToTimestamp = require('objectid-to-timestamp');
mongoose.createConnection(config.mongodb);

