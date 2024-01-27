import React from "react";
import CommonBox from "./CommonBox";
import { Divider, Text, Image } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { useState } from "react";
import Loading from "./Loading";
import deafultImage from "../api/836.jpg";
import axios from "axios";
import moment from "moment";

import DetailBox from "../modules/directory/components/DetailBox";

const UserDetail = () => {
  const [data, setData] = useState([{}]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  let formattedDateOfBirth = "--";

  if (data?.data?.dob) {
    formattedDateOfBirth = moment(data?.data?.dob).format("DD MMM YYYY");
  }

  const details = [
    { key: "First Name", value: data?.data?.firstName || "--" },
    { key: "Last Name", value: data?.data?.lastName || "--" },
    { key: "Date of Birth", value: formattedDateOfBirth || "--" },
    { key: "Phone", value: data?.data?.phone || "--" },
    { key: "Blood Group", value: data?.data?.bloodGroup || "--" },
    { key: "Guardian Name", value: data?.data?.guardianName || "--" },
    { key: "Gender", value: data?.data?.gender || "--" },
    { key: "Education", value: data?.data?.education || "--" },
    { key: "Native Place", value: data?.data?.nativePlace || "--" },
    { key: "Wedding Date", value: data?.data?.weddingDate || "--" },
    { key: "Email", value: data?.data?.email || "--" },
    { key: "Name", value: data?.data?.business?.name || "--" },
    { key: "Description", value: data?.data?.business?.description || "--" },
    {
      key: "Pincode",
      value: data?.data?.address?.pincode || "--",
    },

    {
      key: "City",
      value: data?.data?.address?.city || "--",
    },
    {
      key: "Locality",
      value: data?.data?.address?.locality || "--",
    },
    {
      key: "State",
      value: data?.data?.address?.state || "--",
    },
    {
      key: "Business Phone",
      value: data?.data?.business?.phone || "--",
    },
    {
      key: "Website",
      value: data?.data?.business?.website || "--",
    },
  ];
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
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
        height: "98vh",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      <Box style={{ height: "2vh" }}></Box>
      <CommonBox
        title={
          data?.data?.firstName + " " + data?.data?.lastName || "Member Details"
        }
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            paddingInline: "0.8rem",
            width: "95vw",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: "40rem",
            overflowX: "hidden",
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
              paddingInline: "0rem",
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
              paddingInline: "0rem",
            }}
          >
            <DetailBox
              item={details}
              style={{ gap: "10px", paddingTop: "0px" }}
              fontSize={{ fontSize: "0.9rem" }}
              properties={[
                "First Name",
                "Date of Birth",
                "Blood Group",
                "Guardian Name",
                "Gender",
                "Education",
              ]}
            />
            <DetailBox
              item={details}
              style={{ gap: "10px", paddingTop: "0px" }}
              fontSize={{ fontSize: "0.9rem" }}
              properties={[
                "Last Name",
                "Phone",
                "Native Place",
                "Wedding Date",
                "Email",
              ]}
            />
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
              paddingInline: "0rem",
            }}
          >
            <DetailBox
              item={details}
              style={{ gap: "10px", paddingTop: "0px" }}
              fontSize={{ fontSize: "0.9rem" }}
              properties={["Name", "Website"]}
            />
            <DetailBox
              item={details}
              style={{ gap: "10px", paddingTop: "0px" }}
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

              paddingInline: "0rem",
            }}
          >
            <DetailBox
              item={details}
              style={{ gap: "10px", paddingTop: "0px" }}
              fontSize={{ fontSize: "0.9rem" }}
              properties={["Pincode", "City"]}
            />
            <DetailBox
              item={details}
              style={{ gap: "10px", paddingTop: "0px" }}
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
