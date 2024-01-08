import { Box } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

export default function InviteMember() {
  const { id } = useParams();
  return <Box>{id}</Box>;
}
