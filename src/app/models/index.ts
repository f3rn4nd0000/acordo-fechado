import mongoose from 'mongoose';
import connectionString from '../config/db.config';
import Book from '../models/book.model'

(mongoose as any).Promise = global.Promise;

interface Db {
    mongoose: typeof mongoose;
    url: string;
    books: any;
}

const db: Db = {
    mongoose: mongoose,
    url: connectionString.url,
    books: Book
};

export default db;

// db.mongoose = mongoose;
// db.url = dbConfig.url;
// db.books = require('./book.model')(db.mongoose);


// const dbConfig = require("../config/db.config.js");

// const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;

// const db = {};
// db.mongoose = mongoose;
// db.url = dbConfig.url;
// db.books = require("./book.model.js")(mongoose);

// module.exports = db;