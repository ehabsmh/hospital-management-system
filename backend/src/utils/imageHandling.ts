import cloudinary from "../configs/cloudinary.config";

export const uploadImage = async (imgPath: string) => {
  const options = {
    use_filename: true,
    overwrite: true,
    folder: "HMS_avatars",
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imgPath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};
