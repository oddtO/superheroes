import multer from "multer";
import { ApiError } from "../exceptions/api-error";
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
      cb(ApiError.BadRequest("file type not allowed"));
    }
  },

  limits: { fileSize: 1000000 }, // 1MB file size limit
});
