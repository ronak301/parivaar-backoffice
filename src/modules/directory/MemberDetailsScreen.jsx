import React from "react";
import { useParams } from "react-router-dom";
import CommonBox from "../../components/CommonBox";
import Base from "../../components/Base";
import { SidePane } from "../../components/SidePane";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useApi } from "../../api/useApi";
import { getMemberDetails } from "../../api/directoryApi";
import Loading from "../../components/Loading";

export default function MemberDetailsScreen() {
  const { communityId, memberId } = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { request, data, loading } = useApi(getMemberDetails);

  React.useEffect(() => {
    request(memberId);
  }, []);

  console.log("datadata", data?.data);

  if (loading) return <Loading />;

  return (
    <Base>
      <SidePane isOpen={isOpen} onClose={onClose} />
      <Button onClick={onOpen}>open</Button>
      <CommonBox title="Member Details"></CommonBox>
    </Base>
  );
}
