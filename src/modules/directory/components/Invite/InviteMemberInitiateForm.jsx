import React from "react";
import { searchUser } from "../../../../api/directoryApi";
import { useApi } from "../../../../api/useApi";
import { includes, map } from "lodash";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { USER_EXIST_STATUS } from "./InviteSingleMemberToCommunity";

export default function InviteMemberInitiateForm({
  communityDetails,
  setUserExistStatus,
  setExistingUser,
  phone,
  setPhone,
}) {
  const { request, loading } = useApi(searchUser);
  const [error, setError] = React.useState("");

  const initiateInvitingMember = async () => {
    /**
     * here can be 3 cases, given user already
     * 1. Given user already exist in our db but in some other community and not in this -> then user in this community
     * 2. Given user already exist in our db band also in this community -> then show error that user already exist in this community
     * 3. given phone number doesnt exist in our db at all -> createUser -> join in this community
     *  */
    const res = await request(phone);
    const user = res?.data?.data?.rows?.[0];
    const userExist = !!user?.id;
    const userExistInThisCommunity = includes(
      map(user?.communities, (c) => c?.id),
      communityDetails?.id
    );

    if (!userExist) {
      setUserExistStatus(USER_EXIST_STATUS.NOT_EXIST);
    } else if (userExist && userExistInThisCommunity) {
      setUserExistStatus(USER_EXIST_STATUS.EXIST_IN_COMMUNITY);
      setError("User alredy present in this community");
    } else if (userExist && !userExistInThisCommunity) {
      setUserExistStatus(
        USER_EXIST_STATUS.EXIST_IN_PLATFORM_BUT_NOT_IN_COMMUNITY
      );
      setExistingUser(user);
    }
  };

  return (
    <Box
      flexDirection={"column"}
      mx={4}
      mt={4}
      mb={6}
      backgroundColor={"white"}
      borderRadius={8}
      py={8}
      px={4}
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}>
      <Text
        fontSize={20}
        fontWeight={"500"}
        color="#262626"
        textAlign={"center"}>
        {"Invite Member"}
      </Text>
      <Text
        fontSize={18}
        fontWeight={"400"}
        color="#161616"
        textAlign={"center"}>
        {
          "Invited members would be added in pending state. Admin can approve them from mobile app or admin panel."
        }
      </Text>
      <Text mt={16} mb={4} fontSize={18} fontWeight={"400"} color="#161616">
        {"Please Enter Member Details"}
      </Text>
      <InputGroup size="lg" mt={6}>
        <InputLeftAddon>+91</InputLeftAddon>
        <Input
          onFocus={() => setError("")}
          onChange={(e) => setPhone(e?.target?.value)}
          placeholder="Enter 10 digit mobile number"
        />
      </InputGroup>
      <Box mt={4}>{error ? <Text color="red">{error}</Text> : null}</Box>

      {/* <FormErrorMessage mx={4} mb={2}>
        {errors.phone && errors.phone.message}
      </FormErrorMessage> */}

      <Box mt={8}>
        <Button
          onClick={initiateInvitingMember}
          type="submit"
          isLoading={loading}
          w="100%"
          colorScheme="blue">
          {"Continue"}
        </Button>
      </Box>
    </Box>
  );
}
