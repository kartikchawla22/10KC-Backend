const ImagesModel = require("../models/imagesModel");
const response = require("../utils/response")

exports.uploadImage = async (req, res) => {
    try {
        if (req.fileValidationError) {
            return response({ res, errorCode: 500, error: req.fileValidationError })
        }
        if (!req.file) {
            return response({ res, error: "No File Found", errorCode: 422 })
        } else {
            const imageUploadObject = {
                imageBuffer: req.file.buffer,
                contentType: req.file.mimetype,
                imageName: req.body.imageName
            };
            const uploadObject = new ImagesModel(imageUploadObject);
            // saving the object into the database
            const uploadProcess = await uploadObject.save();
            return response({ res, data: { imageId: uploadProcess.imageId, imageName: uploadProcess.imageName } })
        }
    } catch (error) {
        return response({ res, errorCode: 500, error })
    }
}

exports.getAllImages = async (req, res) => {
    try {
        let convertedImages = []
        const images = await ImagesModel.find();
        if (images.length > 0) {
            convertedImages = images.map(({ _doc }) => {
                return { ..._doc, imageBuffer: `data:${_doc.contentType};base64,${Buffer.from(_doc.imageBuffer).toString("base64")}` }
            })
        }
        return response({ res, data: convertedImages.length ? convertedImages : null });
    } catch (error) {
        response({ res, error });
    }
}

exports.deleteImageUsingID = async (req, res) => {
    try {
        const { imageId } = req.query
        const deletedImage = await ImagesModel.deleteOne({ imageId });
        if (deletedImage.deletedCount > 0) {
            return response({ res, data: { deletedImage, imageId: parseInt(imageId) } });
        } else {
            return response({ res, error: `Image id ${imageId} not found.` });

        }
    } catch (error) {
        response({ res, error });
    }
}