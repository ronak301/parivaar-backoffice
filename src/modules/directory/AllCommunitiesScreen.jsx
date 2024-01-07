import React from "react";
import { getAllCommunities } from "../../api/directoryApi";
import { isEmpty } from "lodash";
import Loading from "../../components/Loading";
import Nodata from "../../components/Nodata";
import { useNavigate } from "react-router-dom";
import List, { Row, RowCell } from "../../components/List";
import Base from "../../components/Base";
import CommonBox from "../../components/CommonBox";
import { Text } from "@chakra-ui/react";

export default function AllCommunitiesScreen() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

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

  if (isEmpty(data)) return <Nodata />;

  if (error) return <Text>Error!!</Text>;

  return (
    <Base>
      <CommonBox title={`Communities (${data?.length})`}>
        <List
          columns={["Name", "Total Members", "Invite Link"]}
          data={data}
          renderRow={({ item }) => {
            return (
              <Row
                onClick={() => {
                  const url = `/dashboard/community/${item?.id}`;
                  navigate(url);
                }}>
                <RowCell value={item?.name} />
                <RowCell value={item?.totalMembers} />
                <RowCell
                  color={"blue"}
                  onClick={(e) => {
                    e?.stopPropagation();
                    navigate(`/community/${item?.id}/add-member/invite`);
                  }}
                  value={"Invite Link"}
                />
              </Row>
            );
          }}
        />
      </CommonBox>
    </Base>
  );
}
