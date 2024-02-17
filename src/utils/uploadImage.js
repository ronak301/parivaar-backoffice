import { ref as fireref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../api/firebase/firebase";
import imageCompression from "browser-image-compression";
import { searchUser } from "../api/directoryApi";

export const uploadImage = async (imageSrc, imagePath) => {
  try {
    const imageRef = fireref(storage, imagePath);
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    let compressedFile;
    // get the compressed image
    if (imageSrc) {
      const resimg = await fetch(imageSrc);
      const blob = await resimg.blob();
      compressedFile = await imageCompression(blob, options);
    }

    const uploadres = await uploadBytes(imageRef, compressedFile);
    console.log(uploadres);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.log(error);
  }
};

export const uniquePhone = async (phoneNumber, isFamilyMember) => {
  if (isFamilyMember && phoneNumber === null) {
    return true;
  }
  console.log(phoneNumber);
  const res = await searchUser(phoneNumber);
  console.log(res);
  if (res?.data?.data?.count > 0) {
    return false;
  } else {
    return true;
  }
};
