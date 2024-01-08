import React, { useState } from "react";
import CommonBox from "../../../components/CommonBox";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import DetailBox from "./DetailBox";
import { getCommunityDetailsForId } from "../../../api/directoryApi";
import Loading from "../../../components/Loading";

export default function CommunityInfo() {
  const { id } = useParams();
  const [data, setData] = React.useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = React.useState(false);

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

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (

          <CommonBox
            title={"Community Info"}
            buttons={[
              {
                text: `Edit`,
                backgroundColor: "white",
                textColor: "#0777FF",
                symbol: "+",
              },
            ]}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                padding: "2rem",
                paddingTop: "0rem",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  gap: "450px",
                }}
              >
                <DetailBox
                  item={data}
                  properties={[
                    { name: "Name" },
                    { type: "Type" },
                    { subType: "SubType" },
                    { status: "Status" },
                  ]}
                />
                <DetailBox
                  item={data}
                  properties={[
                    { description: "Description" },
                    { showFamilyMembers: "Show Family Member" },
                    { logo: "Logo" },
                  ]}
                />
              </Box>
            </Box>
          </CommonBox>

      )}
    </>
  );
}
