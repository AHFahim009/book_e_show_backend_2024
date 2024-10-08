import multer from "multer"

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads")
  },
  filename(req, file, callback) {
    callback(null, file.originalname)
  },
})
export const singleFile = multer({ storage }).single("photo")


