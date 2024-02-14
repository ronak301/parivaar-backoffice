import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import addimg from "../../../api/836.jpg";
import { storage } from "../../../api/firebase/firebase";
import { Box, Text as Head, Input, FormLabel, Image } from "@chakra-ui/react";
import { AiOutlineUpload, AiOutlineClose } from "react-icons/ai";
import { IconButton, Button, Spinner } from "@chakra-ui/react";
import { ref as fireref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";
import FieldForm from "./Form/FieldForm";
import { setSuccess } from "../../../redux/successReducer";
import { useDispatch } from "react-redux";
import {
  addToCommunity,
  createBusiness,
  createRelation,
  createUser,
} from "../../../api/directoryApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef } from "react";
const UserForm = ({ phoneNumber, isFamilyMember = false }) => {
  const [imageSrc, setImageSrc] = React.useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  //   console.log(user);
  const { id } = useParams();
  const { communityId } = useParams();
  const uploadIconRef = useRef(null);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({});
  const uploadImage = async (imageSrc) => {
    try {
      let imagePath = `/user/ + ${Date().toString()}`;
      const imageRef = fireref(storage, imagePath);
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      let compressedFile;
      const resimg = await fetch(imageSrc);
      const blob = await resimg.blob();
      compressedFile = await imageCompression(blob, options);
      const uploadres = await uploadBytes(imageRef, compressedFile);
      console.log("uploadres", uploadres);
      const downloadURL = await getDownloadURL(imageRef);
      console.log("downloadURL", downloadURL);
      console.log("imagePath", imagePath);
      return { downloadURL, imagePath };
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    setLoading(true);
    if (phoneNumber === "") {
      phoneNumber = null;
    }

    try {
      Object.keys(data).forEach((key) => {
        if (data[key] === "") {
          data[key] = null;
        }
      });
      const { fullAddress, pincode, city, locality, state } = data;
      const {
        firstName,
        lastName,
        dob,
        gender,
        education,
        nativePlace,
        phone,
        weddingDate,
        bloodGroup,
        name,
        description,
        website,
        bphone,
      } = data;

      const business = { name, description, phone: bphone, website };

      const personal = {
        firstName,
        lastName,
        dob,
        gender,
        education,
        nativePlace,
        phone,
        weddingDate,
        bloodGroup,
      };

      const address = { fullAddress, pincode, city, locality, state };

      var profilePicture = null;
      var imagePat = null;

      if (imageChange && imageSrc !== null) {
        const { downloadURL, imagePath } = await uploadImage(imageSrc);
        profilePicture = downloadURL;
        imagePat = imagePath;
        console.log("inside image upload", profilePicture, imagePath);
      }
      var parentNode = null;
      var root = user?.root?.id;
      console.log(user?.id);

      if (isFamilyMember) {
        parentNode = user?.id;
      }

      const userCre = await createUser({
        ...personal,
        profilePicture: profilePicture,
        imagePath: imagePat,
        phone: phoneNumber,
        parentNode: parentNode,
        rootNode: root,
        address: address,
      });
      console.log(userCre);

      if (userCre) {
        await createBusiness({
          ownerId: userCre?.data?.id,
          ...business,
        });
        if (isFamilyMember) {
          await addToCommunity(communityId, userCre?.data?.id);
          await createRelation(user?.id, userCre?.data?.id, data.type);
        } else {
          await addToCommunity(id, userCre?.data?.id);
        }

        dispatch(setSuccess());
        await toast({
          status: "success",
          title: "Member Created",
          description: "Member Created Successfully",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const field = [
    {
      field: "firstName",
      text: "First Name",
      type: "text",
      req: "true",
    },
    {
      field: "lastName",
      text: "Last Name",
      type: "text",
      req: "true",
    },
    isFamilyMember && {
      field: "type",
      text: "Relationship Type",
      type: "select",
      options: [
        "Son",
        "Daughter",
        "Husband",
        "Wife",
        "Sister",
        "Brother",
        "Father",
      ],
    },
    {
      field: "dob",
      text: "Date of Birth",
      type: "date",
    },

    {
      field: "guardianName",
      text: "Guardian Name",
      type: "text",
    },

    {
      field: "nativePlace",
      text: "Native Place",
      type: "text",
    },
    {
      field: "gender",
      text: "Gender",
      type: "select",

      options: ["Male", "Female", "Other"],
    },
    {
      field: "weddingDate",
      text: "Wedding Date",
      type: "date",
    },
    {
      field: "education",
      text: "Education",
      type: "text",
    },
    {
      field: "bloodGroup",
      text: "Blood Group",
      type: "select",

      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    {
      field: "profile_picture",
      type: "file",
    },
    {
      field: "path",
      type: "path",
    },
  ];
  const businessField = [
    {
      field: "name",
      text: "Name",
      type: "text",
    },
    {
      field: "description",
      text: "Description",
      type: "text",
    },
    {
      field: "bphone",
      text: "Phone",
      type: "text",
    },
    {
      field: "website",
      text: "Website",
      type: "text",
    },
  ];
  const addressField = [
    {
      field: "fullAddress",
      text: "Full Address",
      type: "text",
    },
    {
      field: "locality",
      text: "Locality",
      type: "select",
      options: ["Udaipur"],
    },
    {
      field: "state",
      text: "State",
      type: "text",
    },
    {
      field: "city",
      text: "City",
      type: "text",
    },
    {
      field: "pincode",
      text: "Pincode",
      type: "text",
    },
  ];
  const [imageChange, setImageChange] = useState(false);

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
  const handleRemoveImage = () => {
    setImageChange(true);
    setImageSrc(null);
  };
  const handleUploadClick = () => {
    uploadIconRef.current.click();
  };
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Box>
        <Head
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            paddingBottom: "0.25rem",
          }}
        >
          Add Member
        </Head>
      </Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          paddingBottom: "1rem",
          flexDirection: "column",
        }}
      >
        <Box style={{ overflowY: "scroll" }}>
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
                      onClick={handleUploadClick}
                      marginBottom={"0.5rem"}
                    />
                  ) : (
                    <Image
                      boxSize="100%"
                      objectFit="cover"
                      src={addimg}
                      onClick={handleUploadClick}
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
          <FieldForm field={field} register={register} errors={errors} />

          <FieldForm
            field={addressField}
            register={register}
            errors={errors}
            header={"Address"}
          />

          <FieldForm
            field={businessField}
            register={register}
            errors={errors}
            header={"Business"}
          />
        </Box>
        <Box
          style={{
            position: "sticky",
            marginTop: "auto",

            height: "5rem",
            paddingBottom: "1rem",
            paddingTop: "1rem",
            marginBottom: "0.6rem",
          }}
        >
          <Button
            style={{
              borderRadius: "1rem",
              border: "1px solid #0777FF",
              backgroundColor: "#0777FF",
              width: "100%",

              color: "white",
            }}
            type="submit"
            isLoading={loading}
            spinner={<Spinner size="md" />}
          >
            + Add Member
          </Button>
        </Box>
      </form>
    </>
  );
};

export default UserForm;
