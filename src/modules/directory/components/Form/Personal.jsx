import React, { useEffect, useState } from "react";
import { Box, Text as Head, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Phone from "../../formComponents/Phone";
import Text from "../../formComponents/Text";
import DateInput from "../../formComponents/Date";
import { updateUser } from "../../../../api/authApi";
import { storage } from "../../../../api/firebase/firebase";
import { ref as fireref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRef } from "react";
import { AiOutlineUpload, AiOutlineClose } from "react-icons/ai";
import addimg from "../../../../api/836.jpg";
import imageCompression from "browser-image-compression";
import { Input, Image, IconButton } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import Select0 from "../../formComponents/Select0";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import "react-image-picker-editor/dist/index.css";
import { useStateWithCallback } from "../../../../components/useStateWithCallback";
import { searchUser } from "../../../../api/directoryApi";

const Personal = React.forwardRef(
  ({ field, setPersonal, setPersonalSubmit }, ref) => {
    const toast = useToast();
    const config2 = {
      borderRadius: "3rem",
      language: "en",
      width: "100px",
      height: "100px",
      objectFit: "contain",
      maxSize: "1",
      hideEditBtn: true,
      compressInitial: 1,
    };
    const { communityId, memberId } = useParams();
    const [profilePicture, setProfilePicture] = useStateWithCallback(null);

    const [path, setPath] = useStateWithCallback(
      field?.find((item) => item?.field === "path")?.value
    );
    const defaultValues = field.reduce((acc, field) => {
      acc[field.field.replace(/\s+/g, "_")] = field.value;
      return acc;
    }, {});

    const {
      register,
      handleSubmit,
      formState: { errors, isDirty },
    } = useForm({
      defaultValues: defaultValues,
    });

    const uploadingImage = async (imageSrc, imagePath, data) => {
      try {
        console.log("image path is", imagePath);
        const imageRef = fireref(storage, imagePath);
        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        let compressedFile;
        if (imageSrc) {
          const resimg = await fetch(imageSrc);
          const blob = await resimg.blob();
          compressedFile = await imageCompression(blob, options);
        }

        const uploadres = await uploadBytes(imageRef, compressedFile);
        console.log(uploadres);

        const downloadURL = await getDownloadURL(imageRef);
        setProfilePicture(downloadURL, (prevValue, newValue) => {
          console.log("profile picture is", newValue);
          updateUser(memberId, {
            profilePicture: newValue,
            imagePath: imagePath,
            ...data,
          });
        });
        console.log("download url is", downloadURL);
        return downloadURL;
      } catch (error) {
        console.log(error);
      }
    };

    const onSubmit = async (data) => {
      if (isDirty || imageChange) {
        console.log("data is", data);
        let phoneNumber = data?.phone;

        console.log("phone number is", phoneNumber);
        const res = await searchUser(phoneNumber);
        if (
          res?.data?.data?.count > 0 &&
          phoneNumber !==
            field?.find((item) => item.field === "phone")?.value &&
          phoneNumber !== null &&
          phoneNumber !== ""
        ) {
          toast({
            title: "Phone Number already exist in database",
            description: "Please enter a unique phone number",
            status: "error",
            duration: 3000,
          });
          return;
        }

        console.log("file size is ok");

        console.log("image changed");

        console.log("path is", path);
        if (imageChange) {
          if (path === null) {
            console.log("path in");

            setPath(`/user/ + ${Date().toString()}`, (prevValue, newValue) => {
              console.log("path is", newValue);
              uploadingImage(imageSrc, newValue, data);
            });
          } else {
            uploadingImage(imageSrc, path, data);
          }
        } else {
          if (data?.phone === "") {
            data.phone = null;
          }

          await updateUser(memberId, {
            ...data,
          });
        }
        setPersonal(true);
        setPersonalSubmit(true);
      } else {
        setPersonal(true);
        setPersonalSubmit(true);
      }
    };
    const [initialImage, setInitialImage] = useState(
      field?.find((item) => item?.field === "profile_picture")?.value
    );

    console.log("initial image is", initialImage);
    const uploadIconRef = useRef(null);
    const [imageChange, setImageChange] = useState(false);

    // console.log("on chnage", onchange);
    const handleImageChange = (e) => {
      const file = e.target.files[0];

      setImageChange(true);

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result;
          setImageSrc(imageData);
        };
        reader.readAsDataURL(file);
      }
    };

    const [imageSrc, setImageSrc] = React.useState(initialImage);
    const handleRemoveImage = () => {
      setImageChange(true);
      setImageSrc(null);
    };
    const handleUploadClick = () => {
      uploadIconRef.current.click();
    };
    console.log("image src is ", imageSrc);
    return (
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
          display={"flex"}
          alignItems={"flex-start"}
        >
          <Head
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "2rem",
            }}
          >
            Personal Information
          </Head>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "1.2rem",
            }}
          >
            <FormLabel color={"black"}>Profile Picture</FormLabel>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {
                <Box
                  position="relative"
                  width="100px"
                  height="100px"
                  marginBottom={"1rem"}
                  padding={"0.5rem"}
                >
                  {imageSrc ? (
                    <Image
                      boxSize="100%"
                      borderRadius="50%"
                      objectFit="cover"
                      src={imageSrc}
                      marginBottom={"0.5rem"}
                    />
                  ) : (
                    <Image
                      boxSize="100%"
                      objectFit="cover"
                      src={addimg}
                      marginBottom={"0.5rem"}
                    />
                  )}
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "2rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <IconButton
                      icon={<AiOutlineClose />}
                      aria-label="Remove Image"
                      onClick={handleRemoveImage}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                    />
                    <IconButton
                      icon={<AiOutlineUpload />}
                      aria-label="Upload Image"
                      size="sm"
                      variant="ghost"
                      onClick={handleUploadClick}
                    />
                  </Box>
                </Box>
              }
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={uploadIconRef}
                height="0%"
                width="0%"
                position="absolute"
                opacity="0"
                aria-hidden="true"
              />
            </Box>
          </Box>

          {field.map((item, index) => (
            <>
              <Box style={{ padding: "0.11rem" }}>
                {item.type === "text" && (
                  <Text
                    text={item.text}
                    errors={errors}
                    field={item.field}
                    req={item.req || false}
                    register={register}
                  />
                )}
              </Box>
              <Box style={{ padding: "0.11rem" }}>
                {item.type === "phone" && (
                  <Phone
                    text={item.text}
                    field={item.field}
                    req={item.req}
                    errors={errors}
                    register={register}
                  />
                )}
              </Box>
              <Box style={{ padding: "0.11rem" }}>
                {item.type === "date" && (
                  <DateInput
                    text={item.text}
                    field={item.field}
                    register={register}
                  />
                )}
              </Box>
              <Box style={{ padding: "0.11rem" }}>
                {item.type === "select" && (
                  <Select0
                    register={register}
                    field={item.field}
                    text={item.text}
                    options={item.options}
                  />
                )}
              </Box>
            </>
          ))}

          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Button
              ref={ref}
              style={{
                borderRadius: "1rem",
                border: "1px solid #0777FF",
                backgroundColor: "#0777FF",
                width: "100%",
                p: "1rem",
                marginTop: "1rem",
                color: "white",
                opacity: 0,
                height: "0",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </>
    );
  }
);

export default Personal;
