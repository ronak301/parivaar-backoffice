import { Box, Flex, Input, Select, Switch, Text } from "@chakra-ui/react";
import React from "react";
import { useConfigManager } from "../../hooks/useConfig.ts";
import { map } from "lodash";

export default function MemberSearchFilterComponent({
  setQuery,
  showOnlyFamilyHeads,
  setShowOnlyFamilyHeads,
  setFilter,
  localityFilter,
  setLocalityFilter,
}) {
  const { config } = useConfigManager();

  const handleLocalityChange = (e) => {
    setLocalityFilter(e?.target?.value);
  };

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
        <Select
          w={300}
          ml={4}
          placeholder="Select Locality"
          value={localityFilter}
          onChange={handleLocalityChange}>
          {map(config?.Localities, (option) => {
            return (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            );
          })}
        </Select>
        <Flex ml={8}>
          <Text mr={2}>Show All Family Members</Text>
          <Switch
            isChecked={showOnlyFamilyHeads}
            onChange={(val) => {
              const isChecked = !!val?.target?.checked;
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
