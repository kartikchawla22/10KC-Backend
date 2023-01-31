const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const dotenv = require("dotenv");
const Schema = mongoose.Schema;

dotenv.config();
const { MONGO_USER, MONGO_PASSOWRD, MONGO_DB } = process.env;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSOWRD}@cluster0.pgtzola.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

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

autoIncrement.initialize(mongoose.connection);
Image.plugin(autoIncrement.plugin, { model: 'Image', field: 'imageId' });
const ImageModel = mongoose.model("Images", Image);

module.exports = ImageModel;
