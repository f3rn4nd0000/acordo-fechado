import * as dotenv from 'dotenv';
dotenv.config({path: `${process.cwd()}/.env`})
// const dotenv = require('dotenv').config({path: process.cwd()+'/.env'})

const connectionString = {
    url: "mongodb+srv://"+process.env["MONGO_LOGIN"]+":"+process.env["MONGO_PSSWD"]+"@acordo-fechado.l5oa3fl.mongodb.net/?retryWrites=true&w=majority"
};

export default connectionString;
// url: "mongodb://localhost:27017/books_db"