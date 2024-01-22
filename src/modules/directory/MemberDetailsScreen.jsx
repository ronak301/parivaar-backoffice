import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CommonBox from "../../components/CommonBox";
import Base from "../../components/Base";
import EditUserForm from "./components/EditUserForm";
import { SidePane } from "../../components/SidePane";
import { Button, useDisclosure, Box } from "@chakra-ui/react";
import { useApi } from "../../api/useApi";
import { getMemberDetails } from "../../api/directoryApi";
import Loading from "../../components/Loading";
import DetailBox from "./components/DetailBox";
import { useRef } from "react";
import { Divider, Text, Image } from "@chakra-ui/react";

export default function MemberDetailsScreen() {
  const { communityId, memberId } = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [data, setData] = useState({});

  const { request, loading } = useApi(getMemberDetails);

  const details = [
    { key: "First Name", value: data?.data?.firstName || "NA" },
    { key: "Last Name", value: data?.data?.lastName || "NA" },
    { key: "Date of Birth", value: data?.data?.dob || "NA" },
    { key: "Phone", value: data?.data?.phone || "NA" },
    { key: "Blood Group", value: data?.data?.bloodGroup || "NA" },
    { key: "Name", value: data?.data?.business?.name || "NA" },
    { key: "Description", value: data?.data?.business?.description || "NA" },
    {
      key: "Address",
      value: data?.data?.business?.address || "NA",
    },
    {
      key: "Business Phone Number",
      value: data?.data?.business?.phone || "NA",
    },
    {
      key: "Website",
      value: data?.data?.business?.website || "NA",
    },
  ];

  const EdituserField = [
    {
      text: "First Name",
      type: "text",
      req: "true",
    },
    {
      text: "Last Name",
      type: "text",
      req: "true",
    },
    {
      text: "Date of Birth",
      type: "data",
    },
    { text: "Phone", type: "phone", req: "true" },
    {
      text: "Blood Group",
      type: "select",
      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    {
      text: "Name",
      type: "text",
    },
    {
      text: "Description",
      type: "text",
    },
    {
      text: "Address",
      type: "text",
    },
    {
      text: "Business Phone Number",
      type: "text",
    },
    {
      text: "Website",
      type: "text",
    },
  ];

  React.useEffect(() => {
    const fetchDeatils = async () => {
      const response = await request(memberId);
      console.log("response is ", response.data.data);
      if (response) {
        setData(response.data);
      }
    };
    fetchDeatils();
  }, [memberId]);

  if (loading) return <Loading />;

  return (
    <Base>
      <SidePane isOpen={isOpen} onClose={onClose}>
        <EditUserForm field={EdituserField} />
      </SidePane>
      <CommonBox
        title="Member Details"
        buttons={[
          {
            text: `Edit Information`,
            backgroundColor: "white",
            textColor: "#0777FF",
            symbol: "+",
            onClick: onOpen,
          },
        ]}
      >
        <Box
          style={{
            display: "flex",
            margin: "auto",
            flexDirection: "column",
            overflowY: "scroll",
            padding: "1rem",
            height: "40rem",

            borderRadius: "10px",
            width: "98%",
          }}
        >
          <Text
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              paddingInline: "1rem",
            }}
          >
            Personal Information
          </Text>
          <Box
            style={{
              paddingInline: "1rem",
              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
              width: "12%",
              paddingTop: "2rem",
              flexDirection: "column",
            }}
          >
            <Text>Profile Picture</Text>
            <Image
              src={data?.data?.profilePicture || ""}
              alt="profile"
              style={{ width: "125px", height: "125px", borderRadius: "50%" }}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingInline: "1rem",

              gap: "25rem",
            }}
          >
            <DetailBox
              item={details}
              style={{}}
              properties={["First Name", "Date of Birth", "Blood Group"]}
            />
            <DetailBox
              item={details}
              style={{}}
              properties={["Last Name", "Phone"]}
            />
          </Box>

          <Divider
            orientation="horizontal"
            style={{
              color: "#EAEAEA",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
          />
          <Text
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              paddingInline: "1rem",
              paddingTop: "1rem",
            }}
          >
            Business Information
          </Text>
          <Box
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingInline: "1rem",
              gap: "25rem",
            }}
          >
            <DetailBox
              item={details}
              style={{}}
              properties={["Name", "Website", "Address"]}
            />
            <DetailBox
              item={details}
              style={{}}
              properties={["Business Phone Number", "Description"]}
            />
          </Box>
        </Box>
      </CommonBox>
    </Base>
  );
}
