import React, { useState } from "react";
import { useToast, Text as Head, Button, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import UploadImage from "./UploadImage";
import { ref as fireref, uploadBytes, getDownloadURL } from "firebase/storage";
import FieldForm from "./FieldForm";
import { updateUser } from "../../../../api/authApi";
import { uploadImage, uniquePhone } from "../../../../utils/uploadImage";

import { createBusiness, updateBusiness } from "../../../../api/directoryApi";
import { useDispatch } from "react-redux";
import { setSuccess } from "../../../../redux/successReducer";

const EditUserForm = ({
  field,
  businessField,
  addressField,
  businessExist,
  isFamilyMember,
}) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { communityId, memberId } = useParams();

  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState(null);

  const defaultValues = field.reduce((acc, field) => {
    acc[field.field.replace(/\s+/g, "_")] = field.value;
    return acc;
  }, {});
  const defaultValues1 = businessField.reduce((acc, field) => {
    acc[field.field.replace(/\s+/g, "_")] = field.value;
    return acc;
  }, {});
  const defaultValues2 = addressField.reduce((acc, field) => {
    acc[field.field.replace(/\s+/g, "_")] = field.value;
    return acc;
  }, {});

  const obj = { ...defaultValues, ...defaultValues1, ...defaultValues2 };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: obj,
  });

  const [imageChange, setImageChange] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  // all data

  const personal = field.map((item) => item.field);
  const business = businessField.map((item) => item.field);
  const address = addressField.map((item) => item.field);

  //

  // Image Upload call->

  const onSubmit = async (data) => {
    setLoading(true);
    // personal and address
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        data[key] = null;
      }
    });
    let personalData = {};
    let addressData = {};
    let businessData = {};

    Object.keys(data).forEach((key) => {
      if (personal.includes(key)) {
        personalData[key] = data[key];
      }
      if (business.includes(key)) {
        if (key === "bphone") {
          businessData["phone"] = data[key];
        } else {
          businessData[key] = data[key];
        }
      }

      if (address.includes(key)) {
        addressData[key] = data[key];
      }
    });
    console.log("business is", businessData);

    //
    var isDirty = true;
    var path = personalData?.path;
    var profilePicture = personalData?.profile_picture;
    if (isDirty) {
      //1) image upload->
      if (imageChange) {
        // path
        if (path === null) {
          path = `/user/ + ${Date().toString()}`;
        }
        profilePicture = await uploadImage(imageSrc, path);
      }

      //2) update user

      let per = personalData;
      delete per.path;
      delete per.profile_picture;
      //
      try {
        if (!uniquePhone(personalData.phone, isFamilyMember)) {
          toast({
            title: "Phone Number already exist in database",
            description:
              "Delete the previous phone number or use a different one",
            status: "error",
            duration: 4000,
          });
          return;
        }

        await updateUser(memberId, {
          profilePicture: profilePicture,
          imagePath: path,
          ...per,
          ...addressData,
        });
      } catch (error) {
        console.log(error.message);
      }

      // Business->  1)exist 2)does not exist

      if (businessExist) {
        console.log("business exist", businessExist);
        try {
          console.log("business data is", businessData);
          await updateBusiness(businessExist, businessData);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        // create new business
        await createBusiness({ ownerId: memberId, ...businessData });
      }
    } else {
      console.log("no change in data");
    }

    toast({
      title: "Updated User success",
      description: "Successfully updated the user profile",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch(setSuccess());
    setLoading(false);
    console.log("data is", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100vh" }}>
      <Head
        style={{
          fontSize: "1.25rem",
          fontWeight: "600",

          marginBottom: "2rem",
        }}
      >
        Edit User
      </Head>
      <Box style={{ overflowY: "scroll", height: "72vh" }}>
        <UploadImage
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          imageChange={imageChange}
          setImageChange={setImageChange}
        />

        <FieldForm field={field} register={register} errors={errors} />
        <FieldForm field={addressField} register={register} errors={errors} />
        <FieldForm field={businessField} register={register} errors={errors} />
      </Box>
      <Button
        style={{
          borderRadius: "1rem",
          border: "1px solid #0777FF",
          backgroundColor: "#0777FF",
          width: "100%",
          p: "1rem",
          marginTop: "2.5rem",
          position: "sticky",
          color: "white",
        }}
        isLoading={loading}
        type="submit"
        loadingText="Updating User..."
        colorScheme="teal"
        variant="outline"
        spinnerPlacement="end"
      >
        Edit User
      </Button>
    </form>
  );
};

export default EditUserForm;
