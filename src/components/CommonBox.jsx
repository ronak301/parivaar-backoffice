import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function CommonBox({ children, title }) {
  return (
    <Box mt={1} bg="white" py={4} borderRadius={"lg"} shadow={"lg"}>
      <Text mx={8} fontWeight={"700"} fontSize={16}>
        {title}
      </Text>
      <Box mb={4} mt={4}>
        {children}
      </Box>
    </Box>
  );
}
