import { Box, Center, Flex, Input, Switch, Text } from "@chakra-ui/react";
import React from "react";

export default function MemberSearchFilterComponent({
  setQuery,
  showOnlyFamilyHeads,
  setShowOnlyFamilyHeads,
  setFilter,
}) {
  return (
    <Box
      mx={16}
      mb={4}
      borderColor={"rgb(234,234,234)"}
      borderWidth={1}
      px={8}
      py={8}
      borderRadius={8}>
      <Flex>
        <Box>
          <Text mb="8px">Search</Text>
          <Input
            w={400}
            onChange={(e) => setQuery(e?.target?.value)}
            placeholder="Search name or phone number"
          />
        </Box>
        <Center
          flexDirection={"column"}
          ml={6}
          alignItems={"center"}
          justifyContent={"center"}>
          <Text mb="8px">Show All Family Members</Text>
          <Switch
            isChecked={showOnlyFamilyHeads}
            onChange={(val) => {
              const isChecked = val?.target?.checked;
              setShowOnlyFamilyHeads((v) => !v);
              if (!isChecked) {
                setFilter((filter) => ({
                  ...filter,
                  parentNode: null,
                }));
              } else {
                setFilter((filter) => {
                  const { parentNode, ...rest } = filter;
                  return rest;
                });
              }
            }}
            colorScheme="teal"
            size="lg"
          />
        </Center>
      </Flex>
    </Box>
  );
}
