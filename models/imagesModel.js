const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
require("dotenv").config();
const Schema = mongoose.Schema;
const { MONGO_USER, MONGO_PASSOWRD, MONGO_DB } = process.env;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSOWRD}@cluster0.pgtzola.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;
const connection = mongoose.createConnection(uri);

autoIncrement.initialize(connection);

const Image = new Schema({
    imageId: {
        type: Number,
        required: true,
        unique: true
    },
    imageBuffer: { type: Buffer },
    contentType: { type: String },
    imageName: {
        type: String,
        required: true,
    },
    uploadTime: {
        type: Date,
        default: Date.now,
    },
});


Image.plugin(autoIncrement.plugin, { model: 'Image', field: 'imageId' });
module.exports = mongoose.model("Images", Image);