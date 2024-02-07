import React from "react";
import { getAllCommunities } from "../../api/directoryApi";
import { useNavigate } from "react-router-dom";
import List, { Row, RowCell } from "../../components/List";
import Base from "../../components/Base";
import CommonBox from "../../components/CommonBox";
import { useDisclosure } from "@chakra-ui/react";
import LoadingWrapper from "../../components/LoadingWrapper";
import { SidePane } from "../../components/SidePane";
import CreateCommunity from "./components/CreateCommunity";
import { firebaseconfig } from "../../api/firebase/firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createCommunity } from "../../api/directoryApi";
import { collection, getDocs } from "firebase/firestore";
export default function AllCommunitiesScreen() {
  const app = initializeApp(firebaseconfig);
  const db = getFirestore(app);
  const [type, setTypes] = React.useState([{}]);

  const [options, setOptions] = React.useState([{}]);
  const [selectedType, setSelectedType] = React.useState();
  React.useEffect(() => {
    const fetchOptions = async () => {
      const snapshot = await getDocs(collection(db, "config"));
      const document = snapshot?.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))?.[0];
      const opt = document?.CommunityTypes;
      const types = opt?.map((obj) => obj.label);
      setOptions(opt);
      setTypes(types);

      setSelectedType(types[0]);
    };
    fetchOptions();
  }, []);

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
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
  let subTypeobj;
  let subType;
  subTypeobj =
    options?.filter((obj) => obj.label === selectedType)[0]?.subTypes || [];
  subType = subTypeobj?.map((obj) => obj.label) || [];

  const fields = [
    {
      field: "name",
      text: "Community Name",
      type: "text",
      req: "true",
    },
    {
      field: "description",
      text: "Description",
      type: "text",
    },
    {
      field: "type",
      text: "Type",
      type: "select",
      options: type,
      onChange: (event) => setSelectedType(event.target.value),
    },
    { field: "subtype", text: "Sub Type", type: "select", options: subType },
  ];

  return (
    <Base>
      <LoadingWrapper loading={loading} error={error} data={data}>
        <CommonBox
          title={`Communities (${data?.length})`}
          buttons={[
            {
              text: `Create Community`,
              backgroundColor: "white",
              textColor: "#0777FF",
              symbol: "+",
              onClick: onOpen,
            },
          ]}
        >
          <SidePane isOpen={isOpen} onClose={onClose}>
            <CreateCommunity field={fields} onClose={onClose} />
          </SidePane>
          <List
            columns={["Name", "Total Members", "Invite Link"]}
            data={data}
            renderRow={({ item }) => {
              return (
                <Row
                  onClick={() => {
                    const url = `/dashboard/community/${item?.id}`;
                    navigate(url);
                  }}
                >
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
      </LoadingWrapper>
    </Base>
  );
}
