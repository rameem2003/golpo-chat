const path = require("path");
const fs = require("fs");

const createLocalFolders = () => {
  const folders = ["certificates", "uploads"];
  folders.forEach((folder) => {
    if (!fs.existsSync(path.join(__dirname, "..", folder))) {
      fs.mkdirSync(path.join(__dirname, "..", folder), { recursive: true });
    }
  });

  if (fs.existsSync(path.join(__dirname, "..", "uploads"))) {
    fs.mkdirSync(path.join(__dirname, "../uploads/", "avatars"), {
      recursive: true,
    });
    fs.mkdirSync(path.join(__dirname, "../uploads/", "thumbnails"), {
      recursive: true,
    });
    fs.mkdirSync(path.join(__dirname, "../uploads/", "vidoes"), {
      recursive: true,
    });
  }
};
module.exports = {
  createLocalFolders,
};
