import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CommonBox from "../../components/CommonBox";
import Base from "../../components/Base";

import { SidePane } from "../../components/SidePane";
import { Button, useDisclosure, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { getMemberDetails } from "../../api/directoryApi";
import EditUserForm from "./components/Form/EditUserForm.jsx";
import DetailBox from "./components/DetailBox";
import Loading from "../../components/Loading";
import { filtercommunityRelatives } from "../../utils/filtercommunityRelatives.js";

import moment from "moment";

import deafultImage from "../../api/836.jpg";
import { Divider, Text, Image } from "@chakra-ui/react";
import List from "../../components/List";
import { RowCell, Row } from "../../components/List";
import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";
import AddMemberForm from "./components/AddMemberForm";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useConfigManager } from "../../hooks/useConfig.ts";
import { setSuccessReset } from "../../redux/successReducer";
import { mappedValue } from "../../utils/mappLogic.js";
import { weburl } from "../../utils/websiteurl.js";
import { setCurrentUser } from "../../redux/userReducer.js";

export default function MemberDetailsScreen() {
  const { success } = useSelector((state) => state.success);
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const { communityId, memberId } = useParams();
  const { config } = useConfigManager();
  console.log("config", config);

  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpen1,
    onClose: onClose1,
    onOpen: onOpen1,
  } = useDisclosure();

  const [data, setData] = useState({});

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
      field: "email",
      text: "Email",
      type: "mail",
      value: data?.data?.email || null,
    },
    {
      field: "phone",
      text: "Phone",
      type: "phone",
      req: data?.data?.parent === null ? true : false,
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
      options: config?.Gender,
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
      options: config?.BloodGroups,
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
      value: data?.data?.address?.fullAddress || null,
    },
    {
      field: "locality",
      text: "Locality",
      type: "select",
      options: config?.Localities,
      value: data?.data?.address?.locality || null,
    },
    {
      field: "state",
      text: "State",
      type: "select",
      options: config?.State,
      value: data?.data?.address?.state || null,
    },
    {
      field: "city",
      text: "City",
      type: "select",
      options: config?.Cities,
      value: data?.data?.address?.city || null,
    },
    {
      field: "pincode",
      text: "Pincode",
      type: "pincode",
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
    {
      key: "Blood Group",
      value: mappedValue(config?.BloodGroups, data?.data?.bloodGroup) || "---",
    },
    { key: "Guardian Name", value: data?.data?.guardianName || "---" },
    {
      key: "Gender",
      value: mappedValue(config?.Gender, data?.data?.gender) || "---",
    },
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
      value: mappedValue(config?.Cities, data?.data?.address?.city) || "---",
    },
    {
      key: "Locality",
      value:
        mappedValue(config?.Localities, data?.data?.address?.locality) || "---",
    },
    {
      key: "State",
      value: mappedValue(config?.State, data?.data?.address?.state) || "---",
    },
    {
      key: "Business Phone",
      value: data?.data?.business?.phone || "---",
    },
    {
      key: "Website",
      value: data?.data?.business?.website ? (
        <Link
          to={weburl(data?.data?.business?.website)}
          style={{
            textDecoration: "none",
            color: "blue",
          }}
          target="_blank"
        >
          {data?.data?.business?.website}
        </Link>
      ) : (
        "---"
      ),
    },
    { key: "Full Address", value: data?.data?.address?.fullAddress || "---" },
  ];

  const fetchDeatils = async () => {
    const response = await getMemberDetails(memberId);
    return response;
  };
  // better way??

  React.useEffect(() => {
    if (memberId !== undefined && memberId !== null) {
      setLoading(true);
      fetchDeatils().then((res) => {
        setData(res.data);
        dispatch(setCurrentUser(res?.data?.data));
        setLoading(false);
      });
    }
  }, [memberId]);

  React.useEffect(() => {
    if (success) {
      setLoading(true);
      fetchDeatils().then((res) => {
        setData(res.data);
        setLoading(false);
        dispatch(setCurrentUser(res?.data?.data));
      });
      onClose();
      onClose1();
      dispatch(setSuccessReset());
    }
  }, [success]);

  const [show, setShow] = useState(false);

  // if (loading) return <Loading />;
  // scroll to top on load not working don t know why??
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [memberId]);
  // console.log("familyHead is ", familyHead);
  if (loading) return <Loading />;
  return (
    <Base>
      <SidePane isOpen={isOpen} onClose={onClose}>
        <EditUserForm
          field={field}
          businessField={businessField}
          isFamilyMember={data?.data?.parent === null ? false : true}
          addressId={data?.data?.address?.id}
          addressField={addressField}
          businessExist={data?.data?.business?.id}
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

          data?.data?.parent === null
            ? {
                text: ` Add Family Member`,
                backgroundColor: "white",
                textColor: "#0777FF",
                symbol: "+",
                onClick: onOpen1,
              }
            : {},
        ]}
        style={{ display: "flex", flexDirection: "row" }}
        isSuperAdmin={data?.data?.isSuperAdmin || false}
        relation={data?.data?.parent === null ? "HEAD" : "FAMILY MEMBER"}
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
          title={data?.data?.parent !== null ? "FAMILY HEAD" : "FAMILY MEMBER"}
        >
          <SidePane isOpen={isOpen1} onClose={onClose1}>
            <AddMemberForm isFamilyMember={true} />
          </SidePane>
          {data?.data?.parent !== null ? (
            <>
              <List
                columns={["Name", "Phone Number", "Relation Type"]}
                data={[data?.data?.parent]}
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
                data={filtercommunityRelatives(
                  data?.data?.relatives,
                  communityId
                )}
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
