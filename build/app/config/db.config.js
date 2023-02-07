"use strict";
var dotenv = require('dotenv').config({ path: process.cwd() + '/.env' });
module.exports = {
    url: "mongodb+srv://" + process.env["MONGO_LOGIN"] + ":" + process.env["MONGO_PSSWD"] + "@acordo-fechado.l5oa3fl.mongodb.net/?retryWrites=true&w=majority"
};
// url: "mongodb://localhost:27017/books_db"
