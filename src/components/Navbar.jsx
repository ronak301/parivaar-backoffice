import { Box } from "@chakra-ui/react";
import React from "react";

export const NAVBAR_HEIGHT = "7vh";

export default function Navbar() {
  return (
    <Box
      style={{ position: "fixed" }}
      w="100%"
      h={NAVBAR_HEIGHT}
      bg="black"></Box>
  );
}
