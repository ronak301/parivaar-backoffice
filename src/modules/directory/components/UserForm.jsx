import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import addimg from "../../../api/836.jpg";
import { storage } from "../../../api/firebase/firebase";
import { Box, Text as Head, Input, FormLabel, Image } from "@chakra-ui/react";

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
  getMemberDetails,
} from "../../../api/directoryApi";
import { useParams } from "react-router-dom";

import UploadImage from "./Form/UploadImage";
import { useConfigManager } from "../../../hooks/useConfig.ts";
const UserForm = ({ phoneNumber, isFamilyMember = false }) => {
  const { config } = useConfigManager();
  const [imageSrc, setImageSrc] = React.useState();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  //   console.log(user);
  const { id } = useParams();
  // id in case of member
  const { communityId, memberId } = useParams();
  // this in case of family member

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getMemberDetails(memberId);
      setUser(response?.data?.data);
      console.log("in ftech user");
    };
    if (memberId) {
      fetchUser();
    }
  }, [memberId]);

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
        guardianName,
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
        guardianName,
        bloodGroup,
      };

      const address = { fullAddress, pincode, city, locality, state };

      var profilePicture = null;
      var imagePat = null;

      if (imageChange && imageSrc !== null) {
        const { downloadURL, imagePath } = await uploadImage(imageSrc);
        profilePicture = downloadURL;
        imagePat = imagePath;
      }
      var parentNode = null;
      var root = user?.root?.id;

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
        toast({
          status: "success",
          title: `${isFamilyMember ? "Family" : ""} Member Created`,
          description: ` ${
            isFamilyMember ? "Family" : ""
          }Member Created Successfully`,
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
      options: config?.FamilyMemberRelationshipTypes,
      required: true,
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
      required: true,
      options: config?.Gender,
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
      required: true,
      options: config?.BloodGroups,
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
      required: true,
      options: config?.Localities,
    },
    {
      field: "state",
      text: "State",
      type: "select",
      required: true,
      options: config?.State,
    },
    {
      field: "city",
      text: "City",
      type: "select",
      required: true,
      options: config?.Cities,
    },
    {
      field: "pincode",
      text: "Pincode",
      type: "pincode",
    },
  ];
  const [imageChange, setImageChange] = useState(false);

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
          {!isFamilyMember ? "Add Member" : "Add Family Member"}
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
        <Box style={{ overflowY: "scroll", paddingTop: "1rem" }}>
          <UploadImage
            setImageChange={setImageChange}
            setImageSrc={setImageSrc}
            imageSrc={imageSrc}
            imageChange={imageChange}
          />
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
            {isFamilyMember ? "+ Add Family Member" : "+ Add Member"}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default UserForm;
