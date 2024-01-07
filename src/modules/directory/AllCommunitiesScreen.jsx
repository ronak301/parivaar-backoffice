import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { getAllCommunities } from "../../api/directoryApi";
import { isEmpty, map } from "lodash";
import Loading from "../../components/Loading";
import Nodata from "../../components/Nodata";

export default function AllCommunitiesScreen() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllCommunities();
        setData(res?.data?.communities);
      } catch (err) {
        setError(err?.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isEmpty(data) && loading) return <Loading />;

  if (!isEmpty(data)) return <Nodata />;

  return (
    <Box p={8} bg="rgb(240,240,240)" flex={1} h="100vh">
      <Box bg="white" py={16} borderRadius={"md"}>
        <Text
          mx={32}
          fontWeight={"700"}
          fontSize={22}>{`Communities (${data?.length})`}</Text>
        <Box mb={16} mt={8} border="medium">
          <TableContainer
            borderRadius={8}
            mx={32}
            borderColor={"gray"}
            borderWidth={1}>
            <Table variant="simple" borderRadius={8}>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Total Memebers</Th>
                  <Th>Link</Th>
                </Tr>
              </Thead>
              <Tbody>
                {map(data, (d) => (
                  <Tr
                    _hover={{
                      cursor: "pointer",
                      backgroundColor: "rgb(240,240,240)",
                    }}>
                    <Td>{d?.name}</Td>
                    <Td>{d?.totalMembers}</Td>
                    <Td>{d?.totalMembers}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
