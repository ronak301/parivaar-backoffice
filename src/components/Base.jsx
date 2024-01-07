import { Box } from "@chakra-ui/react";
import React from "react";
import { NAVBAR_HEIGHT } from "./Navbar";

export default function Base({ children }) {
  return (
    <Box p={8} bg="rgb(244,244,244)" flex={1} h={`100vh - ${NAVBAR_HEIGHT}`}>
      {children}
    </Box>
  );
}
