const multer = require('multer')
const storage = multer.memoryStorage();
const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"]

const fileFilter = (req, file, next) => {
    if (allowedFileTypes.indexOf(file.mimetype) > -1) {
        next(null, true);
    } else {
        req.fileValidationError = "Only png, jpg and jpeg files are allowed"
        next(null, false, req.fileValidationError);
    }
}

exports.upload = multer({ storage: storage, fileFilter });
