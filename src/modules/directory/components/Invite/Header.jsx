import { Center, Image, Text } from "@chakra-ui/react";
import React from "react";

export default function Header({ communityDetails }) {
  return (
    <Center
      flexDirection={"column"}
      mx={4}
      mt={4}
      mb={6}
      backgroundColor={"white"}
      borderRadius={8}
      p={8}
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}>
      <Image
        borderRadius="full"
        fallbackSrc="https://via.placeholder.com/150"
        src={communityDetails?.logo}
        w={150}
        h={150}
      />
      <Text
        mt={4}
        fontSize={26}
        fontWeight={"600"}
        color="#262626"
        textAlign={"center"}>
        {communityDetails?.name}
      </Text>
      <Text
        fontSize={16}
        fontWeight={"400"}
        color="#262626"
        textAlign={"center"}>
        {communityDetails?.description}
      </Text>
    </Center>
  );
}
