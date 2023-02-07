"use strict";
var dbConfig = require("../config/db.config.js");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.books = require("./book.model.js")(mongoose);
module.exports = db;
