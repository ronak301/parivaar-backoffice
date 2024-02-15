import React, { useEffect, useState } from "react";
import { Box, Text as Head, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Phone from "../formComponents/Phone";
import UserForm from "./UserForm.jsx";
import { createRelation, searchUser } from "../../../api/directoryApi";
import { useToast, Select as Chakraselect } from "@chakra-ui/react";
import { Spinner, FormLabel } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Image,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { addToCommunity } from "../../../api/directoryApi";
import { useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setSuccess } from "../../../redux/successReducer.js";
import { set } from "lodash";

const AddMemberForm = ({ isFamilyMember = false }) => {
  const [relation, setRelation] = useState("");
  const relationOptions = ["Father", "Mother", "Brother", "Sister", "Other"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
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
  const cancelRef = React.useRef();
  const { memberId: userId } = useParams();
  console.log("userId", userId);
  const cancelRef1 = React.useRef();
  const addUser = async () => {
    await addToCommunity(id, existingUser?.id);
    dispatch(setSuccess());
    onClose();
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

        if (isExist?.data?.data?.count > 0) {
          // exist in db give option to add relation as
          setExistingUser(isExist?.data?.data?.rows[0]);
          onOpen1();
        } else {
          setPhoneNumber(data.phone);
        }
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
          // give option to add in community
          setExistingUser(isExist?.data?.data?.rows[0]);
          onOpen();
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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              User Already Exist
            </AlertDialogHeader>
            <AlertDialogBody>
              Do you want to add user to this community?
              <Card style={{ marginTop: "1rem" }}>
                <CardBody
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "2rem",
                    alignItems: "flex-start",

                    justifyContent: "flex-start",
                  }}
                >
                  <Image
                    boxSize={"100px"}
                    style={{ borderRadius: "1rem" }}
                    src={existingUser?.profilePicture}
                  />
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.3rem",
                    }}
                  >
                    <Text style={{ fontSize: "15px" }}>
                      {existingUser?.firstName + " " + existingUser?.lastName}
                    </Text>
                    <Text style={{ fontSize: "11px" }}>
                      {existingUser?.education}
                    </Text>
                  </Box>
                </CardBody>
              </Card>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={addUser} ml={3}>
                Add User
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog
        isOpen={isOpen1}
        leastDestructiveRef={cancelRef1}
        onClose={onClose1}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              User Already Exist
            </AlertDialogHeader>
            <AlertDialogBody>
              Do you want to add user to your family
              <Card style={{ marginTop: "1rem" }}>
                <CardBody
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "2rem",
                    alignItems: "flex-start",

                    justifyContent: "flex-start",
                  }}
                >
                  <Image
                    boxSize={"100px"}
                    style={{ borderRadius: "1rem" }}
                    src={existingUser?.profilePicture}
                  />
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.3rem",
                    }}
                  >
                    <Text style={{ fontSize: "15px" }}>
                      {existingUser?.firstName + " " + existingUser?.lastName}
                    </Text>
                    <Text style={{ fontSize: "11px" }}>
                      {existingUser?.education}
                    </Text>
                    <form>
                      <FormLabel>
                        <Text style={{ fontSize: "11px" }}>Relation</Text>
                      </FormLabel>
                      <Chakraselect
                        defaultValue={relation}
                        size={"15px"}
                        style={{ padding: "0.5rem", borderRadius: "0.375rem" }}
                        onChange={(e) => setRelation(e.target.value)}
                      >
                        {relationOptions?.map((option, key) => (
                          <option key={key} value={option}>
                            {option}
                          </option>
                        ))}
                      </Chakraselect>
                    </form>
                  </Box>
                </CardBody>
              </Card>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef1} onClick={onClose1}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={addRelation} ml={3}>
                Add family Member
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

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
