import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
} from "@chakra-ui/react";
import React from "react";

export default function MemberAddedSuccessFully({
  setInviteStatus,
  setExistingUser,
  reset,
  setUserExistStatus,
}) {
  return (
    <Box w="90%">
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        mx={4}
        borderRadius={8}
        w="100%"
        height="260px">
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          User Invited!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Thanks for inviting user.
        </AlertDescription>
      </Alert>
      <Button
        mt={8}
        onClick={() => {
          reset?.({});
          setUserExistStatus(null);
          setInviteStatus();
          setExistingUser(null);
        }}
        colorScheme="blue"
        w="100%"
        mx={4}
        variant={"solid"}>
        Add Another User
      </Button>
    </Box>
  );
}
