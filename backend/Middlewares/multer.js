import multer from "multer";

// Configure the storage settings for Multer
const storage = multer.diskStorage({
  // Set destination folder for uploaded files
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  // Set the filename for uploaded files
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Create and export the multer instance with the defined storage configuration
export const upload = multer({ storage });
