import React, { useEffect, useState } from "react";
import { Box, Text as Head, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Phone from "../formComponents/Phone";
import UserForm from "./UserForm.jsx";
import { searchUser } from "../../../api/directoryApi";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
const AddMemberForm = ({ isFamilyMember = false }) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({});
  const [phoneNumber, setPhoneumber] = useState(null);

  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (isFamilyMember && data.phone === "") {
        setPhoneumber(data.phone);
        setLoading(false);
        return;
      }
      const isExist = await searchUser(data.phone);

      if (isExist?.data?.data?.count > 0) {
        toast({
          title: "Error",
          description: "User Already Exist",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        setPhoneumber(data.phone);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (phoneNumber !== null) {
    return (
      <UserForm phoneNumber={phoneNumber} isFamilyMember={isFamilyMember} />
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box style={{ overflowY: "hidden" }}>
          <Head
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "2rem",
            }}
          >
            Add Member
          </Head>
          <Box style={{ padding: "0.11rem" }}>
            <Phone
              text={"Phone"}
              field={"phone"}
              req={!isFamilyMember}
              errors={errors}
              register={register}
            />
          </Box>
        </Box>
        <Box
          style={{
            position: "sticky",
            marginTop: "auto",
          }}
        >
          <Button
            style={{
              borderRadius: "1rem",
              border: "1px solid #0777FF",
              backgroundColor: "#0777FF",
              width: "100%",
              p: "1rem",
              color: "white",
            }}
            type="submit"
            isLoading={loading}
            spinner={<Spinner size="md" />}
          >
            Next
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AddMemberForm;
