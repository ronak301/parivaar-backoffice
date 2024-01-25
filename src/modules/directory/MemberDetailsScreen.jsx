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
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import BusinessForm from "./components/Form/BusinessForm";
import AddressForm from "./components/Form/AddressForm";
import UserCard from "../../components/Card";

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
    {
      field: "firstName",
      text: "First Name",
      type: "text",
      req: "true",
      value: data?.data?.firstName || "NA",
    },
    {
      field: "lastName",
      text: "Last Name",
      type: "text",
      req: "true",
      value: data?.data?.lastName || "NA",
    },
    {
      field: "dob",
      text: "Date of Birth",
      type: "date",
      value: data?.data?.dob || "NA",
    },
    {
      field: "phone",
      text: "Phone",
      type: "phone",
      req: "true",
      value: data?.data?.phone || "NA",
    },
    {
      field: "guardianName",
      text: "Guardian Name",
      type: "text",
      value: data?.data?.guardianName || "NA",
    },
    {
      field: "nativePlace",
      text: "Native Place",
      type: "text",
      value: data?.data?.nativePlace || "NA",
    },
    {
      field: "gender",
      text: "Gender",
      type: "select",
      value: data?.data?.gender || "NA",
      options: ["Male", "Female", "Other"],
    },
    {
      field: "weddingDate",
      text: "Wedding Date",
      type: "date",
      value: data?.data?.weddingDate || "NA",
    },
    {
      field: "education",
      text: "Education",
      type: "text",
      value: data?.data?.education || "NA",
    },
    {
      field: "bloodGroup",
      text: "Blood Group",
      type: "select",
      value: data?.data?.bloodGroup || "NA",
      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
  ];
  const businessField = [
    {
      field: "name",
      text: "Name",
      type: "text",
      value: data?.data?.business?.name || "NA",
    },
    {
      field: "description",
      text: "Description",
      type: "text",
      value: data?.data?.business?.description || "NA",
    },
    {
      field: "phone",
      text: "Phone",
      type: "text",
      value: data?.data?.business?.phone || "NA",
    },
    {
      field: "website",
      text: "Website",
      type: "text",
      value: data?.data?.business?.website || "NA",
    },
  ];
  const addressField = [
    {
      field: "locality",
      text: "Locality",
      type: "text",
      value: data?.data?.address?.locality || "NA",
    },
    {
      field: "state",
      text: "State",
      type: "text",
      value: data?.data?.address?.state || "NA",
    },
    {
      field: "city",
      text: "City",
      type: "text",
      value: data?.data?.address?.city || "NA",
    },
    {
      field: "pincode",
      text: "Pincode",
      type: "text",
      value: data?.data?.address?.pincode || "NA",
    },
  ];
  const details = [
    { key: "First Name", value: data?.data?.firstName || "NA" },
    { key: "Last Name", value: data?.data?.lastName || "NA" },
    { key: "Date of Birth", value: data?.data?.dob || "NA" },
    { key: "Phone", value: data?.data?.phone || "NA" },
    { key: "Blood Group", value: data?.data?.bloodGroup || "NA" },
    { key: "Guardian Name", value: data?.data?.guardianName || "NA" },
    { key: "Gender", value: data?.data?.gender || "NA" },
    { key: "Education", value: data?.data?.education || "NA" },
    { key: "Native Place", value: data?.data?.nativePlace || "NA" },
    { key: "Wedding Date", value: data?.data?.weddingDate || "NA" },
    { key: "Email", value: data?.data?.email || "NA" },
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
      key: "Business Phone",
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
        <Box style={{ overflowY: "scroll", height: "90%", width: "100%" }}>
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
        style={{ display: "flex", flexDirection: "row" }}
        isSuperAdmin={data?.data?.isSuperAdmin || false}
        approvalStatus={data?.data?.approvalStatus || false}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
              padding: "1rem",
              alignItems: "flex-start",
              overflowX: "hidden",
              height: "40rem",
              borderRadius: "10px",
              width: "80%",
            }}
          >
            <Text
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
              }}
            >
              Personal Information
            </Text>

            <Box
              style={{
                padding: "1rem",
                paddingLeft: "0.5rem",
                display: "flex",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "center",
                paddingTop: "2rem",
                flexDirection: "column",
              }}
            >
              <Text>Profile Picture</Text>
              <Image
                src={data?.data?.profilePicture || deafultImage}
                alt="profile"
                style={{
                  borderRadius: "50%",
                  width: "4rem",
                  height: "4rem",
                }}
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
            <Box
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
            >
              <Accordion
                allowToggle
                style={{
                  justifyContent: "center",
                  display: "flex",
                  border: "2px solid white",
                  width: "100%",
                }}
              >
                <AccordionItem style={{ width: "100%" }}>
                  <h2>
                    <AccordionButton
                      style={{
                        fontSize: "12px",
                        color: "black",
                        backgroundColor: "whitesmoke",
                        margin: "auto",
                        borderRadius: "8px",
                        width: "12%",
                        textAlign: "center",
                        padding: "0.4rem 0.4rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <Box as="span" flex="1" textAlign="center">
                        Show More
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel style={{ width: "100%", padding: 0 }}>
                    <Box
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        marginLeft: "4rem",
                        gap: "25rem",
                      }}
                    >
                      <DetailBox
                        item={details}
                        style={{}}
                        properties={["Guardian Name", "Gender", "Education"]}
                      />
                      <DetailBox
                        item={details}
                        style={{}}
                        properties={["Native Place", "Wedding Date", "Email"]}
                      />
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
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
                properties={["Business Phone", "Description"]}
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

          <Box
            style={{
              border: "2x solid red",
              width: "30%",
              marginTop: "1.2rem",
              overflowX: "hidden",
              overflowY: "scroll",
              height: "40rem",
            }}
          >
            <Text
              style={{
                fontSize: "1.2rem",
                textAlign: "center",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Family Members
            </Text>
            {data?.data ? (
              <>
                {data?.data?.relatives.map((item) => (
                  <UserCard
                    name={item?.firstName + " " + item?.lastName}
                    phone={item?.phone}
                    education={item?.education}
                    id={item?.id}
                    uimg={item?.profilePicture}
                    relation={item?.relationship?.type}
                  />
                ))}
              </>
            ) : (
              <>
                <Loading />
              </>
            )}
          </Box>
        </Box>
      </CommonBox>
    </Base>
  );
}
