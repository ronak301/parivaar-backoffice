import { Box, Button, Center, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useApi } from "../../../../api/useApi";
import { addToCommunity } from "../../../../api/directoryApi";

export default function UserAlreadyExist({
  communityId,
  user,
  setExistingUser,
  setInviteStatus,
  setUserExistStatus,
}) {
  const { request, loading } = useApi(addToCommunity);
  const onAddUserToCommunity = async () => {
    const res = await request(communityId, user?.id);

    console.log("resres", res?.data, communityId, user?.id);
    if (res?.data?.success) {
      alert("Success", "User Added Successfully");
      setInviteStatus("success");
    } else {
      alert("Error", "Something went wrong!!");
    }
  };

  return (
    <>
      <Text mx={4} lineHeight={1.2}>
        This user already exist in our platform, Would you like to go ahead and
        this user to this community?
      </Text>
      <Center
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
        <Box>
          <Image src={user?.profilePicture} width={140} h={140} rounded={999} />
        </Box>
        <Text
          mt={2}
          fontSize={28}
          fontWeight={"500"}>{`${user?.firstName} ${user?.lastName}`}</Text>
        <Text fontSize={22} fontWeight={"400"}>{`${user?.education}`}</Text>
        <Text
          fontSize={22}
          fontWeight={"400"}>{`${user?.business?.name}`}</Text>
      </Center>

      <Box mx={4}>
        <Button
          variant="none"
          onClick={() => {
            setUserExistStatus(null);
            setExistingUser(null);
          }}
          w="100%"
          colorScheme="blue">
          {"Go Back"}
        </Button>
      </Box>
      <Box mx={4} mt={5}>
        <Button
          variant="solid"
          isLoading={loading}
          onClick={onAddUserToCommunity}
          w="100%"
          colorScheme="blue">
          {"Invite"}
        </Button>
      </Box>
    </>
  );
}
