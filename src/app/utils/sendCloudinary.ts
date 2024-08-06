import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config";

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const sendCloudinary = (
  imageName: string,
  path: string
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    // host image in cloudinary
    cloudinary.uploader.upload(
      path,
      { public_id: imageName, overwrite: true },
      function (error, result) {
        if (error) {
          reject(
            (error.message =
              "Image Hosting failed . Check your internet connection")
          );
          console.error("cloudinary", error);
        }
        resolve(result as UploadApiResponse);
        // delete image from local disk
        fs.unlink(path, (err) => {
          if (err) console.error(err);
          else {
            console.warn("file deleted successfully");
          }
        });
      }
    );
  });
};
