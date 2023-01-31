const ImagesModel = require("../models/imagesModel");
const response = require("../utils/response");

exports.uploadImage = async (req, res) => {
    try {
        const { fileValidationError, file, body } = req;
        if (fileValidationError) {
            return response({ res, errorCode: 500, error: fileValidationError });
        }
        if (!file) {
            return response({ res, error: "No File Found", errorCode: 422 });
        }
        const { buffer: imageBuffer, mimetype: contentType } = file;
        const { imageName } = body;
        const uploadObject = new ImagesModel({ imageBuffer, contentType, imageName });
        const uploadProcess = await uploadObject.save();
        return response({
            res,
            data: { imageId: uploadProcess.imageId, imageName: uploadProcess.imageName },
        });
    } catch (error) {
        return response({ res, errorCode: 500, error });
    }
};

exports.getAllImages = async (req, res) => {
    try {
        const images = await ImagesModel.find();
        const convertedImages = images.map(({ _doc: { contentType, imageBuffer, ...rest } }) => {
            return {
                ...rest,
                imageBuffer: `data:${contentType};base64,${Buffer.from(imageBuffer).toString(
                    "base64"
                )}`,
            };
        });
        return response({ res, data: convertedImages.length ? convertedImages : null });
    } catch (error) {
        response({ res, error });
    }
};

exports.deleteImageUsingID = async (req, res) => {
    try {
        const { imageId } = req.query;
        const deletedImage = await ImagesModel.deleteOne({ imageId });
        if (deletedImage.deletedCount > 0) {
            return response({ res, data: { deletedImage, imageId: parseInt(imageId) } });
        }
        return response({ res, error: `Image id ${imageId} not found.` });
    } catch (error) {
        response({ res, error });
    }
};
