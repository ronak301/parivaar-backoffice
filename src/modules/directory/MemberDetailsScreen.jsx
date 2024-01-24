import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CommonBox from "../../components/CommonBox";
import Base from "../../components/Base";
import Personal from "./components/Form/Personal";
import { SidePane } from "../../components/SidePane";
import { Button, useDisclosure, Box } from "@chakra-ui/react";
import { useApi } from "../../api/useApi";
import { getMemberDetails } from "../../api/directoryApi";
import Loading from "../../components/Loading";
import DetailBox from "./components/DetailBox";
import { useRef } from "react";
import deafultImage from "../../api/836.jpg";
import { Divider, Text, Image } from "@chakra-ui/react";
import BusinessForm from "./components/Form/BusinessForm";
import AddressForm from "./components/Form/AddressForm";

export default function MemberDetailsScreen() {
  const { communityId, memberId } = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [data, setData] = useState({});
  const businessRef = useRef(null);
  const personalRef = useRef(null);
  const addressRef = useRef(null);

  const { request, loading } = useApi(getMemberDetails);
  const handleFormSubmit = () => {
    personalRef.current?.click();
    businessRef.current?.click();
    addressRef.current?.click();
  };

  const field = [
    { field: "firstName", text: "First Name", type: "text", req: "true" },
    { field: "lastName", text: "Last Name", type: "text", req: "true" },
    { field: "dob", text: "Date of Birth", type: "data" },
    { field: "phone", text: "Phone", type: "phone", req: "true" },
    {
      field: "bloodGroup",
      text: "Blood Group",
      type: "select",
      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
  ];
  const businessField = [
    { field: "name", text: "name", type: "text" },
    { field: "description", text: "description", type: "text" },
    { field: "address", text: "address", type: "text" },
    { field: "phone", text: "phone", type: "text" },
    { field: "website", text: "website", type: "text" },
  ];
  const addressField = [
    { field: "locality", text: "Locality", type: "text" },
    { field: "state", text: "State", type: "text" },
    { field: "city", text: "City", type: "text" },
    { field: "pincode", text: "Pincode", type: "text" },
  ];
  const details = [
    { key: "First Name", value: data?.data?.firstName || "NA" },
    { key: "Last Name", value: data?.data?.lastName || "NA" },
    { key: "Date of Birth", value: data?.data?.dob || "NA" },
    { key: "Phone", value: data?.data?.phone || "NA" },
    { key: "Blood Group", value: data?.data?.bloodGroup || "NA" },
    { key: "Name", value: data?.data?.business?.name || "NA" },
    { key: "Description", value: data?.data?.business?.description || "NA" },
    {
      key: "Pincode",
      value: data?.data?.address?.pincode || "NA",
    },
    {
      key: "City",
      value: data?.data?.address?.city || "NA",
    },
    {
      key: "Locality",
      value: data?.data?.address?.locality || "NA",
    },
    {
      key: "State",
      value: data?.data?.address?.state || "NA",
    },
    {
      key: "Phone",
      value: data?.data?.business?.phone || "NA",
    },
    {
      key: "Website",
      value: data?.data?.business?.website || "NA",
    },
  ];

  React.useEffect(() => {
    const fetchDeatils = async () => {
      const response = await request(memberId);
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
        <Box style={{ overflowY: "scroll", height: "90%" }}>
          <Personal ref={personalRef} field={field} />
          <AddressForm
            ref={addressRef}
            field={addressField}
            id={data?.data?.address?.id || null}
          />
          <BusinessForm
            ref={businessRef}
            id={data?.data?.business?.id || null}
            field={businessField}
          />
        </Box>
        <Button
          style={{
            borderRadius: "1rem",
            border: "1px solid #0777FF",
            backgroundColor: "#0777FF",
            width: "100%",
            p: "1rem",
            marginTop: "2.5rem",
            position: "sticky",
            color: "white",
          }}
          onClick={handleFormSubmit}
        >
          Submit
        </Button>
      </SidePane>
      <CommonBox
        title={
          data?.data?.firstName + " " + data?.data?.lastName || "Member Details"
        }
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
              src={data?.data?.profilePicture || deafultImage}
              alt="profile"
              style={{ borderRadius: "50%" }}
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
              properties={["Name", "Website"]}
            />
            <DetailBox
              item={details}
              style={{}}
              properties={["Phone", "Description"]}
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
            Address Information
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
              properties={["Pincode", "City"]}
            />
            <DetailBox
              item={details}
              style={{}}
              properties={["Locality", "State"]}
            />
          </Box>
        </Box>
      </CommonBox>
    </Base>
  );
}
