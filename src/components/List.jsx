import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { map, set } from "lodash";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import React from "react";

export default function List({
  data,
  renderRow,
  columns,
  sortBy,
  setSortBy,
  setSortDirection,
  sortDirection,
}) {
  const handleSort = (id) => () => {
    if (id === "time") {
      setSortBy(id);
      setSortDirection(!sortDirection);
    }
  };
  return (
    <TableContainer
      overflowY="auto"
      maxH={500}
      borderRadius={8}
      mx={8}
      borderColor={"gray.200"}
      borderWidth={1}
    >
      <Table variant="simple" borderRadius={8}>
        <Thead scrollBehavior={"auto"}>
          <Tr h="28px" bg="black">
            {map(columns, (c) => (
              <Th camelCase onClick={handleSort(c)}>
                <Text fontSize={14} fontWeight={"500"} color="white">
                  {c} {}{" "}
                  {sortBy === c ? (
                    <>
                      {sortDirection ? (
                        <TriangleDownIcon />
                      ) : (
                        <TriangleUpIcon />
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </Text>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{map(data, (item) => renderRow({ item }))}</Tbody>
      </Table>
    </TableContainer>
  );
}

export const Row = ({ onClick, children, ...rest }) => {
  return (
    <Tr
      {...rest}
      onClick={onClick}
      _hover={{
        cursor: "pointer",
        backgroundColor: "rgb(240,240,240)",
      }}
    >
      {children}
    </Tr>
  );
};

export const RowCell = ({ value, children, ...rest }) => {
  return (
    <Td {...rest}>{children || <Text fontWeight={"500"}>{value}</Text>}</Td>
  );
};
