import multer from "multer";
// Memory storage configuration
const storage = multer.memoryStorage();
export const uploadMiddleware = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },

  limits: { fileSize: 1000000 }, // 1MB file size limit
});
