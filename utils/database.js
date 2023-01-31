const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_USER, MONGO_PASSOWRD, MONGO_DB } = process.env;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSOWRD}@cluster0.pgtzola.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

module.exports = mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(db => db)
    .catch(err => err);