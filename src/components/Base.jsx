import { Box } from "@chakra-ui/react";
import React from "react";
import { NAVBAR_HEIGHT } from "./Navbar";

export default function Base({ children }) {
  return (
    <Box mt={NAVBAR_HEIGHT} p={2} bg="rgb(243,243,249)" flex={1} h={`93vh`}>
      {children}
    </Box>
  );
}
