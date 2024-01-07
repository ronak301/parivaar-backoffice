import { Box, Center, Image, Text } from "@chakra-ui/react";
import React from "react";
import { getCommunityMembersForCommunityId } from "../../api/directoryApi";
import { isEmpty } from "lodash";
import Loading from "../../components/Loading";
import Nodata from "../../components/Nodata";
import { useNavigate, useParams } from "react-router-dom";
import List, { Row, RowCell } from "../../components/List";
import Base from "../../components/Base";
import CommonBox from "../../components/CommonBox";
import MemberSearchFiltterComponent from "./MemberSearchFilterComponent";
import { useDebounce } from "use-debounce";

export default function CommunityDetailsScreen() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [query, setQuery] = React.useState("");
  const [showOnlyFamilyHeads, setShowOnlyFamilyHeads] = React.useState(true);
  const [filter, setFilter] = React.useState({
    limit: 10,
    skip: 0,
  });

  const [debouncedText] = useDebounce(query?.replace(/\s/g, "").trim(), 500);

  const { skip, limit, ...restFilter } = filter;

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getCommunityMembersForCommunityId(
          id,
          filter?.skip,
          filter?.limit,
          debouncedText,
          restFilter
        );
        setData(res?.data);
      } catch (err) {
        setError(err?.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [debouncedText, filter?.skip, filter?.limit, id, filter?.parentNode]);

  if (isEmpty(data) && loading) return <Loading />;

  if (isEmpty(data)) return <Nodata />;

  if (error) return <Text>Error!!</Text>;

  return (
    <Base>
      <CommonBox title={`All Family Members - ${data?.totalMembers}`}>
        <MemberSearchFiltterComponent
          setQuery={setQuery}
          showOnlyFamilyHeads={showOnlyFamilyHeads}
          setShowOnlyFamilyHeads={setShowOnlyFamilyHeads}
          setFilter={setFilter}
        />
        <Text
          mx={32}
          pb={2}
          pt={2}>{`Showing ${data?.members?.count} members`}</Text>
        <List
          columns={["Image", "Name", "Business/Job", "Number", "Guardian Name"]}
          data={data?.members?.rows}
          renderRow={({ item }) => {
            return (
              <Row
                onClick={() => {
                  const url = `/community/${item?.id}`;
                  navigate(url);
                }}>
                <RowCell>
                  {item?.profilePicture ? (
                    <Image
                      src={item?.profilePicture}
                      w={12}
                      h={12}
                      rounded={999}
                    />
                  ) : (
                    <Center w={12} h={12} bg="green.300" borderRadius={999}>
                      <Text color="white">{`${item?.firstName?.charAt(
                        0
                      )}${item?.lastName?.charAt(0)}`}</Text>
                    </Center>
                  )}
                </RowCell>
                <RowCell value={`${item?.firstName} ${item?.lastName}`} />
                <RowCell value={`${item?.business?.name || ""}`} />
                <RowCell value={item?.phone} />
                <RowCell value={item?.guardianName} />
              </Row>
            );
          }}
        />
      </CommonBox>
    </Base>
  );
}
