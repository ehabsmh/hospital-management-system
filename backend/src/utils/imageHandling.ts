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
    const url = cloudinary.url(result.public_id, {
      transformation: [
        { quality: "auto", fetch_format: "auto" },
        { crop: "fill", gravity: "auto" },
      ],
    });

    console.log(url);
    return url;
  } catch (error) {
    console.error(error);
  }
};
