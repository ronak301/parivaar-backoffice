import React from "react";
import CommonBox from "./CommonBox";
import { Divider, Text, Image } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading";
import deafultImage from "../api/836.jpg";
import axios from "axios";
import DetailBox from "../modules/directory/components/DetailBox";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const UserDetail = () => {
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(false);
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
  const { phoneNumber } = useParams();
  console.log(phoneNumber);
  React.useEffect(() => {
    const fetchDeatils = async () => {
      if (phoneNumber) {
        setLoading(true);
        const user = await axios.post(
          "https://api.parivaarapp.in/user/search",
          {
            query: phoneNumber,
            filter: {},
            limit: 10000,
            skip: 0,
          }
        );
        console.log("user is", user);

        if (user.data) {
          const userId = user?.data?.data?.rows[0]?.id;
          console.log("userId is", userId);
          if (userId) {
            const member = await axios.get(
              `https://api.parivaarapp.in/user/${userId}`
            );
            console.log("member is", member);
            if (member.data) {
              setData(member.data);
              setLoading(false);
              console.log("data is", data);
            }
          }
        }
      }
    };
    fetchDeatils();
  }, [phoneNumber]);
  if (loading) {
    return (
      <Box
        style={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </Box>
    );
  }
  return (
    <Box
      style={{
        marginTop: "0rem",
        width: "100vw",
        height: "100vh",
        overflowY: "hidden",
      }}
    >
      <Box style={{ height: "1vh" }}></Box>
      <CommonBox
        title={
          data?.data?.firstName + " " + data?.data?.lastName || "Member Details"
        }
        style={{ display: "flex", flexDirection: "row" }}
        isSuperAdmin={data?.data?.isSuperAdmin || false}
        approvalStatus={data?.data?.approvalStatus || false}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            padding: "1rem",
            paddingInline: "0.5rem",
            width: "100vw",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: "40rem",
            borderRadius: "10px",
          }}
        >
          <Text
            style={{
              fontSize: "1rem",
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
              paddingInline: "1rem",
              paddingTop: "0.2rem",
              flexDirection: "column",
            }}
          >
            <Text style={{ fontSize: "0.8rem" }}>Profile Picture</Text>
            <Image
              src={data?.data?.profilePicture || deafultImage}
              alt="profile"
              style={{
                borderRadius: "50%",
                width: "2.5rem",
                height: "2.5rem",
              }}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "flex-start",
              paddingInline: "1rem",
              gap: "3rem",
            }}
          >
            <DetailBox
              item={details}
              style={{ gap: "10px", paddingTop: "0px", width: "11rem" }}
              fontSize={{ fontSize: "0.9rem" }}
              properties={["First Name", "Date of Birth", "Blood Group"]}
            />
            <DetailBox
              item={details}
              style={{ gap: "10px", paddingTop: "0px", width: "11rem" }}
              fontSize={{ fontSize: "0.9rem" }}
              properties={["Last Name", "Phone"]}
            />
          </Box>
          <Box
            style={{
              width: "100%",
              marginTop: "1rem",
              marginInline: "0rem",
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
                      width: "32%",
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
                <AccordionPanel
                  style={{ width: "100%", padding: 0, paddingInline: "5rem" }}
                >
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginLeft: "1.7rem",
                      justifyContent: "center",
                      gap: "3rem",
                    }}
                  >
                    <DetailBox
                      item={details}
                      style={{ gap: "10px", paddingTop: "0px", width: "11rem" }}
                      fontSize={{ fontSize: "0.9rem" }}
                      properties={["Guardian Name", "Gender", "Education"]}
                    />
                    <DetailBox
                      item={details}
                      style={{ gap: "10px", paddingTop: "0px", width: "11rem" }}
                      fontSize={{ fontSize: "0.9rem" }}
                      properties={["Native Place", "Wedding Date", "Email"]}
                    />
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>

          <Text
            style={{
              fontSize: "1rem",
              fontWeight: "600",

              paddingTop: "1rem",
            }}
          >
            Business Information
          </Text>
          <Box
            style={{
              display: "flex",
              alignItems: "flex-start",
              paddingTop: "0.2rem",
              justifyContent: "center",
              paddingInline: "1rem",
              gap: "3rem",
            }}
          >
            <DetailBox
              item={details}
              style={{ gap: "10px", paddingTop: "0px", width: "11rem" }}
              fontSize={{ fontSize: "0.9rem" }}
              properties={["Name", "Website"]}
            />
            <DetailBox
              item={details}
              style={{ gap: "10px", paddingTop: "0px", width: "11rem" }}
              fontSize={{ fontSize: "0.9rem" }}
              properties={["Business Phone", "Description"]}
            />
          </Box>
          <Divider
            orientation="horizontal"
            style={{
              color: "#EAEAEA",
              paddingTop: "0.2rem",
              width: "95%",
              margin: "auto",
              paddingBottom: "0.1rem",
            }}
          />
          <Text
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              paddingTop: "1rem",
            }}
          >
            Address Information
          </Text>
          <Box
            style={{
              display: "flex",
              alignItems: "flex-start",
              paddingTop: "0.2rem",
              justifyContent: "center",
              gap: "3rem",
              paddingInline: "1rem",
            }}
          >
            <DetailBox
              item={details}
              style={{ gap: "10px", paddingTop: "0px", width: "11rem" }}
              fontSize={{ fontSize: "0.9rem" }}
              properties={["Pincode", "City"]}
            />
            <DetailBox
              item={details}
              style={{ gap: "10px", paddingTop: "0px", width: "11rem" }}
              fontSize={{ fontSize: "0.9rem" }}
              properties={["Locality", "State"]}
            />
          </Box>
        </Box>
      </CommonBox>
    </Box>
  );
};

export default UserDetail;
