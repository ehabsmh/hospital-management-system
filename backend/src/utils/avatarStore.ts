import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      console.log("File received:", file);
      cb(null, "public/uploads");
    } catch (err) {
      console.error("Error in multer storage destination:", err);
    }
  },
  filename: function (req, file, cb) {
    try {
      console.log("File received:", file);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname); // Always use .jpg
    } catch (err) {
      console.error("Error in multer storage filename:", err);
    }
  },
});

const upload = multer({ storage: storage });

export default upload;
