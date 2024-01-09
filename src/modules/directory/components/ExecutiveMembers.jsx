import React, { useEffect } from "react";
import CommonBox from "../../../components/CommonBox";
import { useParams } from "react-router-dom";
import List, { Row, RowCell } from "../../../components/List";
import { useNavigate } from "react-router-dom";
import { Image, Center, Text } from "@chakra-ui/react";
import { getCommunityDetailsForId } from "../../../api/directoryApi";
import MemberSearchFiltterComponent from "../MemberSearchFilterComponent";
import { useDebounce } from "use-debounce";
import SearchFilterComponent from "../SearchFilterComponents";
export default function ExecutiveMembers({ communityId }) {
  const { id } = useParams();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState({
    limit: 10,
    skip: 0,
  });
  const [filteredExecutives, setFilteredExecutives] = React.useState([]);
  const [showOnlyFamilyHeads, setShowOnlyFamilyHeads] = React.useState(true);
  const [debouncedText] = useDebounce(query?.replace(/\s/g, "").trim(), 500);
  const navigate = useNavigate();
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getCommunityDetailsForId(id);
        setData(res?.data);
        setLoading(false);
      } catch (err) {
        setError(err?.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    const filtered = data?.executives?.filter((executive) => {
      const fullName = `${executive?.firstName}${executive?.lastName}`
        .replace(/\s/g, "")
        .toLowerCase();
      console.log(debouncedText);
      const phone = (executive?.phone || "").toLowerCase();
      return (
        fullName.startsWith(debouncedText.toLowerCase()) ||
        phone.includes(debouncedText.toLowerCase())
      );
    });
    setFilteredExecutives(filtered);
  }, [data?.executives, debouncedText]);

  // console.log("id", id);
  return (
    <CommonBox
      title={`Executive Members(${data?.executives?.length})`}
      buttons={[
        {
          text: `Add Executive Member`,
          backgroundColor: "white",
          textColor: "#0777FF",
          symbol: "+",
        },
      ]}
    >
      <SearchFilterComponent setQuery={setQuery} setFilter={setFilter} />
      <List
        columns={["Full Name", "Blood Group", "Profile", "Phone", "Role"]}
        data={filteredExecutives}
        renderRow={({ item }) => {
          return (
            <Row
              onClick={() => {
                const url = `/dashboard/community/${communityId}/member/${item?.id}`;
                navigate(url);
              }}
            >
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
              <RowCell value={`${item?.bloodGroup || ""}`} />
              <RowCell value={item?.phone} />
              <RowCell value={item?.executive?.roles[0]} />
            </Row>
          );
        }}
      />
    </CommonBox>
  );
}
