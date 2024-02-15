import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CommonBox from "../../components/CommonBox";
import Base from "../../components/Base";
import Personal from "./components/Form/Personal";
import { SidePane } from "../../components/SidePane";
import { Button, useDisclosure, Box } from "@chakra-ui/react";

import { useApi } from "../../api/useApi";

import { getMemberDetails } from "../../api/directoryApi";

import EditUserForm from "./components/Form/EditUserForm.jsx";
import DetailBox from "./components/DetailBox";
import { useRef } from "react";
import moment from "moment";

import deafultImage from "../../api/836.jpg";
import { Divider, Text, Image } from "@chakra-ui/react";
import List from "../../components/List";
import { RowCell, Row } from "../../components/List";
import { useNavigate } from "react-router-dom";

import BusinessForm from "./components/Form/BusinessForm";
import AddressForm from "./components/Form/AddressForm";

import { useToast } from "@chakra-ui/react";
import AddMemberForm from "./components/AddMemberForm";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSuccessReset } from "../../redux/successReducer";

export default function MemberDetailsScreen() {
  const { success } = useSelector((state) => state.success);
  const navigate = useNavigate();
  const toast = useToast();
  const { communityId, memberId } = useParams();
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpen1,
    onClose: onClose1,
    onOpen: onOpen1,
  } = useDisclosure();

  const [data, setData] = useState({});

  const { request } = useApi(getMemberDetails);

  const [relation, setRelation] = useState(null);

  const field = [
    {
      field: "firstName",
      text: "First Name",
      type: "text",
      req: "true",
      value: data?.data?.firstName || null,
    },
    {
      field: "lastName",
      text: "Last Name",
      type: "text",
      req: "true",
      value: data?.data?.lastName || null,
    },
    {
      field: "dob",
      text: "Date of Birth",
      type: "date",
      value: data?.data?.dob || null,
    },
    {
      field: "phone",
      text: "Phone",
      type: "phone",
      req: relation === "HEAD" ? true : false,
      value: data?.data?.phone || null,
    },
    {
      field: "guardianName",
      text: "Guardian Name",
      type: "text",
      value: data?.data?.guardianName || null,
    },

    {
      field: "nativePlace",
      text: "Native Place",
      type: "text",
      value: data?.data?.nativePlace || null,
    },
    {
      field: "gender",
      text: "Gender",
      type: "select",
      value: data?.data?.gender || null,
      options: ["Male", "Female", "Other"],
    },
    {
      field: "weddingDate",
      text: "Wedding Date",
      type: "date",
      value: data?.data?.weddingDate || null,
    },
    {
      field: "education",
      text: "Education",
      type: "text",
      value: data?.data?.education || null,
    },
    {
      field: "bloodGroup",
      text: "Blood Group",
      type: "select",
      value: data?.data?.bloodGroup || null,
      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    {
      field: "profile_picture",
      type: "file",
      value: data?.data?.profilePicture || null,
    },
    {
      field: "path",
      type: "path",
      value: data?.data?.imagePath || null,
    },
  ];
  const businessField = [
    {
      field: "name",
      text: "Name",
      type: "text",
      value: data?.data?.business?.name || null,
    },
    {
      field: "description",
      text: "Description",
      type: "text",
      value: data?.data?.business?.description || null,
    },
    {
      field: "bphone",
      text: "Phone",
      type: "text",
      value: data?.data?.business?.phone || null,
    },
    {
      field: "website",
      text: "Website",
      type: "text",
      value: data?.data?.business?.website || null,
    },
  ];
  const addressField = [
    {
      field: "fullAddress",
      text: "Full Address",
      type: "text",
      value: data?.data?.address?.fullAddress || "---",
    },
    {
      field: "locality",
      text: "Locality",
      type: "select",
      options: ["Udaipur", "HiranMagrisector3"],
      value: data?.data?.address?.locality || null,
    },
    {
      field: "state",
      text: "State",
      type: "text",
      value: data?.data?.address?.state || null,
    },
    {
      field: "city",
      text: "City",
      type: "text",
      value: data?.data?.address?.city || null,
    },
    {
      field: "pincode",
      text: "Pincode",
      type: "text",
      value: data?.data?.address?.pincode || null,
    },
  ];

  const details = [
    { key: "First Name", value: data?.data?.firstName || "---" },
    { key: "Last Name", value: data?.data?.lastName || "---" },
    {
      key: "Date of Birth",
      value: (data?.data?.dob && moment(data?.data?.dob).format("LL")) || "---",
    },
    { key: "Phone", value: data?.data?.phone || "---" },
    { key: "Blood Group", value: data?.data?.bloodGroup || "---" },
    { key: "Guardian Name", value: data?.data?.guardianName || "---" },
    { key: "Gender", value: data?.data?.gender || "---" },
    { key: "Education", value: data?.data?.education || "---" },
    { key: "Native Place", value: data?.data?.nativePlace || "---" },
    {
      key: "Wedding Date",
      value:
        (data?.data?.weddingDate &&
          moment(data?.data?.weddingDate).format("LL")) ||
        "---",
    },
    { key: "Email", value: data?.data?.email || "---" },
    { key: "Name", value: data?.data?.business?.name || "---" },
    { key: "Description", value: data?.data?.business?.description || "---" },
    {
      key: "Pincode",
      value: data?.data?.address?.pincode || "---",
    },

    {
      key: "City",
      value: data?.data?.address?.city || "---",
    },
    {
      key: "Locality",
      value: data?.data?.address?.locality || "---",
    },
    {
      key: "State",
      value: data?.data?.address?.state || "---",
    },
    {
      key: "Business Phone",
      value: data?.data?.business?.phone || "---",
    },
    {
      key: "Website",
      value: data?.data?.business?.website || "---",
    },
    { key: "Full Address", value: data?.data?.address?.fullAddress || "---" },
  ];
  const [familyHead, setFamilyHead] = useState(null);
  const [businessExist, setBusinessExist] = useState(null);
  const [isFamilyMember, setIsFamilyMember] = useState(true);

  const fetchDeatils = async () => {
    const response = await request(memberId);
    if (response) {
      setData(response.data);
      if (response?.data?.data?.business) {
        setBusinessExist(response?.data?.data?.business?.id);
      }
      console.log("user in member screen", response.data);
      const userId = response?.data?.data?.id;
      const parent = response?.data?.data?.parent;
      if (parent === null) {
        setRelation("HEAD");
        setIsFamilyMember(false);
      } else {
        const parentId = response?.data?.data?.parent?.id;
        const respons = await request(parentId);
        setFamilyHead(respons?.data?.data);
        setRelation(
          respons?.data?.data?.relatives?.find((item) => item?.id === userId)
            ?.relationship?.type
        );
      }
    }
  };
  // better way??
  React.useEffect(() => {
    fetchDeatils();
    if (success) {
      fetchDeatils();
      onClose();
      dispatch(setSuccessReset());
    }
  }, [memberId, success]);

  const [show, setShow] = useState(false);

  // if (loading) return <Loading />;

  // scroll to top on load not working don t know why??
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [memberId]);
  // console.log("familyHead is ", familyHead);

  return (
    <Base>
      <SidePane isOpen={isOpen} onClose={onClose}>
        <EditUserForm
          field={field}
          businessField={businessField}
          isFamilyMember={isFamilyMember}
          addressField={addressField}
          businessExist={businessExist}
        />
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
        relation={relation}
        approvalStatus={data?.data?.approvalStatus || false}
      >
        <Box
          style={{
            display: "flex",
            width: "90%",
            justifyContent: "space-between",
          }}
        >
          <Box
            style={{
              display: "flex",

              height: show ? "100%" : "35rem",
              flexDirection: "column",
              overflowY: "hidden",
              padding: "1rem",
              alignItems: "flex-start",
              overflowX: "hidden",

              borderRadius: "10px",
              width: "100%",
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
            {relation !== "HEAD" && (
              <Box
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  flexDirection: "column",
                  gap: "5px",
                  paddingInline: "1rem",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "24px",
                    width: "15rem",
                    fontFamily: "Arial",
                    color: "#666666",
                  }}
                >
                  Relation Type
                </Text>
                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "18px",
                    fontFamily: "Arial",
                    width: "100%",
                    color: "#000000",
                  }}
                >
                  {relation}
                </Text>
              </Box>
            )}

            <Box
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",

                paddingInline: "1rem",
                width: "100%",
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
            {show && (
              <>
                <Box
                  style={{
                    width: "100%",
                    marginInline: "auto",
                    marginTop: "1rem",
                  }}
                >
                  <Box
                    style={{
                      width: "100%",

                      display: "flex",
                      alignItems: "center",
                      padding: "1rem",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <DetailBox
                        item={details}
                        style={{}}
                        properties={["Guardian Name", "Gender", "Education"]}
                      />
                    </Box>
                    <Box>
                      <DetailBox
                        item={details}
                        s
                        properties={["Native Place", "Wedding Date", "Email"]}
                      />
                    </Box>
                  </Box>
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
                    paddingInline: "1rem",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <DetailBox
                    item={details}
                    properties={["Pincode", "City", "Full Address"]}
                  />
                  <DetailBox
                    item={details}
                    properties={["Locality", "State"]}
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
                    width: "100%",
                    justifyContent: "space-between",

                    paddingInline: "1rem",
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
              </>
            )}
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                width: "80%",
              }}
            >
              <Button size="sm" onClick={() => setShow(!show)} mt="1rem">
                Show {show ? "Less" : "More"}
              </Button>
            </Box>
          </Box>
        </Box>
      </CommonBox>
      <Box paddingTop={"2rem"} paddingBottom={"5rem"}>
        <CommonBox
          title={relation === "HEAD" ? "Family Members" : "Family Head"}
          buttons={[
            {
              text: ` Add Family Member`,
              backgroundColor: "white",
              textColor: "#0777FF",
              symbol: "+",
              onClick: onOpen1,
            },
          ]}
        >
          <SidePane isOpen={isOpen1} onClose={onClose1}>
            <AddMemberForm isFamilyMember={true} />
          </SidePane>
          {relation !== "HEAD" ? (
            <>
              <List
                columns={["Name", "Phone Number", "Relation Type"]}
                data={[familyHead]}
                renderRow={({ item }) => {
                  return (
                    <Row
                      onClick={() => {
                        const url = `/dashboard/community/${communityId}/member/${item?.id}`;

                        navigate(url);
                      }}
                    >
                      <RowCell value={item?.firstName + "" + item?.lastName} />
                      <RowCell value={item?.phone} />
                      <RowCell value={"Family Head"} />
                    </Row>
                  );
                }}
              />
            </>
          ) : (
            <>
              <List
                columns={["Name", "Phone Number", "Relation Type"]}
                data={data?.data?.relatives}
                renderRow={({ item }) => {
                  return (
                    <Row
                      onClick={() => {
                        const url = `/dashboard/community/${communityId}/member/${item?.id}`;
                        navigate(url);
                      }}
                    >
                      <RowCell value={item?.firstName + "" + item?.lastName} />
                      <RowCell value={item?.phone} />
                      <RowCell value={item?.relationship?.type} />
                    </Row>
                  );
                }}
              />
            </>
          )}
        </CommonBox>
      </Box>
    </Base>
  );
}
