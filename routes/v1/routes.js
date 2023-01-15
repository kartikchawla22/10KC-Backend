const express = require("express");
const router = express.Router();
const controller = require("../../controllers/controller");
const { upload } = require("../../utils/upload")

router.post("/uploadImage", upload.single("file"), controller.uploadImage)
router.get('/getAllImages', controller.getAllImages)
router.delete('/deleteImageUsingID', controller.deleteImageUsingID)
module.exports = router;