const cloudinary = require("cloudinary").v2;
const upload_image = async (files, folder) => {
  const upload = cloudinary.uploader.upload(files, {
    resource_type: "auto",
    folder: folder,
  });
  return upload;
};

module.exports = {
  upload_image
};