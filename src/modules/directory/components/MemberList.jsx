import {
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import {
  getCommunityMembersForCommunityId,
  removeFromCommunity,
} from "../../../api/directoryApi";
import { isEmpty } from "lodash";
import Loading from "../../../components/Loading";
import Nodata from "../../../components/Nodata";
import { useNavigate, useParams } from "react-router-dom";
import List, { Row, RowCell } from "../../../components/List";
import CommonBox from "../../../components/CommonBox";
import MemberSearchFiltterComponent from "../MemberSearchFilterComponent";
import { useDebounce } from "use-debounce";

export default function MemberList() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [userToRemove, setUserToRemove] = React.useState(null);
  const [isRemovingUser, setIsRemovingUser] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const communityId = id;
  const [query, setQuery] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState();
  console.log("communityIdcommunityId", communityId);

  const [showOnlyFamilyHeads, setShowOnlyFamilyHeads] = React.useState(true);
  const [filter, setFilter] = React.useState({
    limit: 10,
    skip: 0,
  });

  const [debouncedText] = useDebounce(query?.replace(/\s/g, "").trim(), 500);

  const { skip, limit, ...restFilter } = filter;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCommunityMembersForCommunityId(
        id,
        filter?.skip,
        filter?.limit,
        debouncedText,
        restFilter
      );
      setData(res?.data);
    } catch (err) {
      setError(err?.message);
      setLoading(false);
    }
  });

  React.useEffect(() => {
    fetchData();
  }, [debouncedText, filter?.skip, filter?.limit, id, filter?.parentNode]);

  const Overlay = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="30%"
      backdropBlur="2px"
    />
  );

  if (isEmpty(data) && loading) return <Loading />;

  if (isEmpty(data)) return <Nodata />;

  if (error) return <Text>Error!!</Text>;

  return (
    <CommonBox title={`All Family Members - ${data?.totalMembers}`}>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>{`Remove Member`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{`Are you sure you want to remove ${userToRemove?.firstName} from this community?`}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            <Button
              isLoading={isRemovingUser}
              ml={2}
              colorScheme="red"
              onClick={async (e) => {
                try {
                  setIsRemovingUser(true);
                  const res = await removeFromCommunity(
                    communityId,
                    userToRemove?.id
                  );
                  console.log("resres", res?.data);
                  if (res?.data?.success) {
                    await fetchData();
                    onClose();
                  } else {
                    console.log("Error Removing User", userToRemove?.id);
                  }
                } catch (err) {
                  console.log("Error Removing User", userToRemove?.id);
                } finally {
                  setIsRemovingUser(false);
                }
              }}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <MemberSearchFiltterComponent
        setQuery={setQuery}
        showOnlyFamilyHeads={showOnlyFamilyHeads}
        setShowOnlyFamilyHeads={setShowOnlyFamilyHeads}
        setFilter={setFilter}
      />
      <Text
        mx={16}
        pb={2}
        pt={2}>{`Showing ${data?.members?.count} members`}</Text>
      <List
        columns={[
          "Image",
          "Name",
          "Business/Job",
          "Number",
          "Guardian Name",
          "",
        ]}
        data={data?.members?.rows}
        renderRow={({ item }) => {
          return (
            <Row
              onClick={() => {
                const url = `/dashboard/community/${communityId}/member/${item?.id}`;
                navigate(url);
              }}>
              <RowCell>
                {item?.profilePicture ? (
                  <Image
                    src={item?.profilePicture}
                    w={12}
                    h={12}
                    rounded={999}
                  />
                ) : (
                  <Center w={12} h={12} bg="green.300" borderRadius={999}>
                    <Text color="white">{`${item?.firstName?.charAt(
                      0
                    )}${item?.lastName?.charAt(0)}`}</Text>
                  </Center>
                )}
              </RowCell>
              <RowCell value={`${item?.firstName} ${item?.lastName}`} />
              <RowCell value={`${item?.business?.name || ""}`} />
              <RowCell value={item?.phone} />
              <RowCell value={item?.guardianName} />
              <RowCell>
                <Button
                  onClick={(e) => {
                    e?.stopPropagation();
                    setUserToRemove(item);
                    setOverlay(<Overlay />);
                    onOpen();
                  }}>
                  Remove
                </Button>
              </RowCell>
            </Row>
          );
        }}
      />
    </CommonBox>
  );
}
