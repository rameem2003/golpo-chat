const fs = require("fs");
const path = require("path");
const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    if (filePath.includes("thumb")) {
      fs.unlink(
        `${path.join(__dirname, "../uploads/thumbnails")}/${filePath}`,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    } else if (filePath.includes("avatar")) {
      fs.unlink(
        `${path.join(__dirname, "../uploads/avatars")}/${filePath}`,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    }
  });
};

module.exports = deleteFile;
