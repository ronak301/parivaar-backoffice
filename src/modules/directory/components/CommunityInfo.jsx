import React, { useState } from "react";
import CommonBox from "../../../components/CommonBox";
import { useParams } from "react-router-dom";
import { Box, Image } from "@chakra-ui/react";
import DetailBox from "./DetailBox";
import { getCommunityDetailsForId } from "../../../api/directoryApi";
import Loading from "../../../components/Loading";
import { SidePane } from "../../../components/SidePane";
import { useDisclosure } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { firebaseconfig } from "../../../api/firebase/firebase.js";
import EditCommunity from "./EditCommunity.tsx";

export default function CommunityInfo() {
  const { id } = useParams();
  const [data, setData] = React.useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
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
  let subTypeobj;
  let subType;
  subTypeobj =
    options?.filter((obj) => obj.label === selectedType)[0]?.subTypes || [];
  subType = subTypeobj?.map((obj) => obj.label) || [];
  const item = [
    {
      key: "Name",
      value: data?.name,
    },
    {
      key: "Type",
      value: data?.type,
    },
    {
      key: "SubType",
      value: data?.subType,
    },
    {
      key: "Status",
      value: data?.status,
    },
    {
      key: "Description",
      value: data?.description,
    },
    {
      key: "Show Family Member",
      value: data?.showFamilyMembers,
    },
    {
      key: "Logo",
      value: <Image src={data?.logo} borderRadius={"5rem"} boxSize="100px" />,
    },
  ];
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

  const fields = [
    {
      field: "name",
      text: "Community Name",
      type: "text",
      req: "true",
      value: data?.name,
    },
    {
      field: "description",
      text: "Description",
      type: "text",
      value: data?.description,
    },
    {
      field: "type",
      text: "Type",
      type: "select",
      options: type,
      value: data?.type,
      onChange: (event) => setSelectedType(event.target.value),
    },
    {
      field: "subtype",
      text: "Sub Type",
      type: "select",
      options: subType,
      value: data?.subType,
    },
  ];

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
              onClick: onOpen,
            },
          ]}
        >
          <SidePane isOpen={isOpen} onClose={onClose}>
            <EditCommunity field={fields} onClose={onClose} />
          </SidePane>
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
                item={item}
                properties={["Name", "Type", "SubType", "Status"]}
              />
              <DetailBox
                item={item}
                properties={["Description", "Show Family Member", "Logo"]}
              />
            </Box>
          </Box>
        </CommonBox>
      )}
    </>
  );
}
