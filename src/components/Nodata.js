import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";

export default function Nodata() {
  return (
    <Center h="100%">
      <Box>
        <Text fontSize={28} fontWeight={"700"} textAlign={"center"}>
          No data
        </Text>
        <Text
          fontSize={20}
          fontWeight={"600"}
          mt={2}
          color="gray.500"
          textAlign={"center"}>
          Seems like there is no data a the moment.
        </Text>
      </Box>
    </Center>
  );
}
