import { Box, Center, Flex, Input, Switch, Text } from "@chakra-ui/react";
import React from "react";

export default function SearchFilterComponent({ setQuery, setFilter }) {
  return (
    <Box mx={8} mb={2} px={2} py={2}>
      <Flex alignItems={"center"}>
        <Box>
          <Input
            w={400}
            onChange={(e) => setQuery(e?.target?.value)}
            placeholder="Search name or phone number"
          />
        </Box>
      </Flex>
    </Box>
  );
}
