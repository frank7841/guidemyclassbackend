const express = require("express");
const uploadMiddleware = require("../../middleware/multer");
const { upload } = require("../controllers/uploadfiles");

const router = express.Router();

router.put("/", uploadMiddleware.array("Files", 10), upload);

module.exports = router;
