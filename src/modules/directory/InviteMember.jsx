import { Box } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../api/useApi";
import { getCommunityDetailsForId } from "../../api/directoryApi";
import LoadingWrapper from "../../components/LoadingWrapper";
import InviteSingleMemberToCommunity from "./components/Invite/InviteSingleMemberToCommunity";
import Header from "./components/Invite/Header";

export default function InviteMember() {
  const { id } = useParams();

  const { data, request, loading, error } = useApi(getCommunityDetailsForId);

  React.useEffect(() => {
    request(id);
  }, []);

  const communityDetails = data;

  return (
    <LoadingWrapper loading={loading} error={error} data={communityDetails}>
      <Box h="100vh" flex={1} bg="rgb(243, 243,249)">
        <Box overflowY={"scroll"}>
          <Header communityDetails={communityDetails} />
          <InviteSingleMemberToCommunity communityDetails={communityDetails} />
        </Box>
      </Box>
    </LoadingWrapper>
  );
}
