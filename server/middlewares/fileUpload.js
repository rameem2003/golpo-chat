const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const { cloudinary } = require("../lib/cloudinary");

/**
 * Creates a dynamic multer upload middleware
 * @description This function is for storing files in the local file system. It creates a multer middleware that can be used to handle file uploads for different types of files (images, videos, avatars, etc.). The function takes an options object with a type property that specifies the type of upload (thumb, video, avatar, media). Based on the type, it sets the allowed file types and size limits. It also creates the necessary folders if they don't exist.
 * @param {Object} options - options object
 * @param {'thumb'|'video'|'avatar'|'media'} options.type - upload type
 * @returns multer middleware
 */
const createUploadMiddleware = ({ type }) => {
  // Set allowed types and limits
  let allowedTypes = [];
  let maxSize = 0;
  let folderName = "";

  if (type === "thumb") {
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    maxSize = 50 * 1024 * 1024; // 50MB
    folderName = "thumbnails";
  } else if (type === "avatar") {
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    maxSize = 5 * 1024 * 1024; // 5MB
    folderName = "avatars";
  } else if (type === "media") {
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    maxSize = 50 * 1024 * 1024; // 50MB
    folderName = "medias";
  } else if (type === "video") {
    allowedTypes = ["video/mp4", "video/mkv", "video/webm"];
    maxSize = 100 * 1024 * 1024; // 100MB
    folderName = "videos";
  } else {
    throw new Error("Invalid upload type. Must be 'image' or 'video'.");
  }

  // Storage configuration
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = `./uploads/${folderName}`;
      // Ensure folder exists
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
  });

  // Filter
  const fileFilter = (req, file, cb) => {
    // console.log("File type:", file);
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type for ${type}.`), false);
    }
  };

  return multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
  });
};

/**
 * Creates a dynamic multer upload middleware
 * @description This function is for storing files in the Cloudinary File Storage. It creates a multer middleware that can be used to handle file uploads for different types of files (images, videos, avatars, etc.). The function takes an options object with a type property that specifies the type of upload (thumb, video, avatar, media). Based on the type, it sets the allowed file types and size limits. It also creates the necessary folders if they don't exist.
 * @param {Object} options - options object
 * @param {'thumb'|'video'|'avatar'|'media'} options.type - upload type
 * @returns multer middleware
 */
const createRemoteUploadMiddleware = ({ type }) => {
  // Set allowed types and limits
  let allowedTypes = [];
  let maxSize = 0;
  let folderName = "";

  if (type === "thumb") {
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    maxSize = 50 * 1024 * 1024; // 50MB
    folderName = "thumbnails";
  } else if (type === "avatar") {
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    maxSize = 5 * 1024 * 1024; // 5MB
    folderName = "avatars";
  } else if (type === "media") {
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    maxSize = 50 * 1024 * 1024; // 50MB
    folderName = "medias";
  } else if (type === "video") {
    allowedTypes = ["video/mp4", "video/mkv", "video/webm"];
    maxSize = 100 * 1024 * 1024; // 100MB
    folderName = "videos";
  } else {
    throw new Error("Invalid upload type. Must be 'image' or 'video'.");
  }

  // cloudinary storage configuration
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
      folder: folderName,
      public_id: `${file.fieldname}-${Date.now()}`,
    })
  })


  // Filter
  const fileFilter = (req, file, cb) => {
    // console.log("File type:", file);
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type for ${type}.`), false);
    }
  };

  return multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
  });
}

module.exports = {createUploadMiddleware, createRemoteUploadMiddleware};
