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
import { map } from "lodash";
import React from "react";

export default function List({ data, renderRow, columns }) {
  return (
    <TableContainer
      overflowY="auto"
      maxH={500}
      borderRadius={8}
      mx={32}
      borderColor={"gray.200"}
      borderWidth={1}>
      <Table variant="simple" borderRadius={8}>
        <Thead scrollBehavior={"auto"}>
          <Tr h="48px" bg="black">
            {map(columns, (c) => (
              <Th camelCase>
                <Text fontSize={14} fontWeight={"500"} color="white">
                  {c}
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
      }}>
      {children}
    </Tr>
  );
};

export const RowCell = ({ value, children, ...rest }) => {
  return (
    <Td {...rest}>{children || <Text fontWeight={"500"}>{value}</Text>}</Td>
  );
};

// color={"blue"}
//         onClick={(e) => {
//           e?.stopPropagation();
//           navigate(`/community/${item?.id}/add-member/invite`);
//         }}
