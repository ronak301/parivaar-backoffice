import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function CommonBox({ children, title }) {
  return (
    <Box bg="white" py={16} borderRadius={"lg"} shadow={"lg"}>
      <Text mx={32} fontWeight={"700"} fontSize={16}>
        {title}
      </Text>
      <Box mb={16} mt={8}>
        {children}
      </Box>
    </Box>
  );
}
