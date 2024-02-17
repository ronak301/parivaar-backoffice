import React, { useState } from "react";
import { Box, Text as Head, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Phone from "../formComponents/Phone";
import UserForm from "./UserForm.jsx";
import { createRelation, searchUser } from "../../../api/directoryApi";
import { useToast, Select as Chakraselect } from "@chakra-ui/react";
import { Spinner, FormLabel } from "@chakra-ui/react";

import { Card, CardBody, Text, Image } from "@chakra-ui/react";

import { addToCommunity } from "../../../api/directoryApi";
import { useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setClose, setSuccess } from "../../../redux/successReducer.js";

const AddMemberForm = ({ isFamilyMember = false }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // community id in case of member add
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({});
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [existingUser, setExistingUser] = useState(null);

  const { memberId: userId } = useParams();
  console.log("userId", userId);

  const addUser = async () => {
    await addToCommunity(id, existingUser?.id);
    toast({
      title: "Member Added Succesfully",
      description: "Member has been added to the community successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch(setSuccess());
  };
  const cancel = () => {
    dispatch(setClose());
  };
  const addRelation = async () => {
    await createRelation(userId, existingUser?.id);
    await addToCommunity(id, existingUser?.id);
    dispatch(setSuccess());
  };

  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      //if  family Member add
      if (isFamilyMember) {
        // either phone Number can be empty or not
        if (data.phone === "") {
          setPhoneNumber("");
          setLoading(false);
          return;
        }

        const isExist = await searchUser(data.phone);
        const inCommunity = isExist?.data?.data?.rows[0]?.communities?.find(
          (item) => item.id === id
        );
        if (isExist?.data?.data?.count > 0) {
          // user already exist in community
          toast({
            title: "User Already Exist",
            description:
              "Use a different phone number or register user without the phone Number",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          dispatch(setSuccess());
        }
        setPhoneNumber(data.phone);
        setLoading(false);
        return;
      }

      // if adding a member

      const isExist = await searchUser(data.phone);
      const inCommunity = isExist?.data?.data?.rows[0]?.communities?.find(
        (item) => item.id === id
      );

      if (isExist?.data?.data?.count > 0) {
        // user already exist
        if (inCommunity) {
          // user already exist in community
          toast({
            title: "User Already Exist in Community",
            description: "Use a different phone number",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          dispatch(setSuccess());
        } else {
          setExistingUser(isExist?.data?.data?.rows[0]);
          console.log("existingUser", existingUser);
        }
      } else {
        // user does not exist go to create member page
        setPhoneNumber(data.phone);
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
            {isFamilyMember ? "Add Family Member" : "Add Member"}
          </Head>
          <Box style={{ padding: "0.11rem" }}>
            <Phone
              text={"Phone"}
              field={"phone"}
              req={!isFamilyMember}
              errors={errors}
              register={register}
            />

            {existingUser && (
              <Box
                bg="white"
                maxW="400px"
                p="4"
                m="auto"
                mt={"6rem"}
                borderRadius="md"
                boxShadow="md"
                textAlign="center"
              >
                <Text fontSize="xl" fontWeight="bold" mb="4">
                  User Already Exists
                </Text>

                <Box>
                  <Image
                    boxSize={"100px"}
                    borderRadius="1rem"
                    src={existingUser?.profilePicture}
                    alt={existingUser?.firstName}
                    mx="auto"
                    mb="2"
                  />
                  <Text fontSize="lg" mb="2">
                    {existingUser?.firstName} {existingUser?.lastName}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {existingUser?.education}
                  </Text>
                </Box>

                <Text mt="4">
                  Do you want to add the user to the community?
                </Text>

                <Box mt="4" textAlign="center">
                  <Button onClick={addUser} colorScheme="green" mx="2">
                    Add
                  </Button>
                  <Button onClick={cancel} variant="outline" mx="2">
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}
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
