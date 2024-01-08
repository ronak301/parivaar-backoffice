import { Box, Center, Flex, Input, Switch, Text } from "@chakra-ui/react";
import React from "react";

export default function MemberSearchFilterComponent({
  setQuery,
  showOnlyFamilyHeads,
  setShowOnlyFamilyHeads,
  setFilter,
}) {
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
        <Flex ml={8}>
          <Text mr={2}>Show All Family Members</Text>
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
        </Flex>
      </Flex>
    </Box>
  );
}
