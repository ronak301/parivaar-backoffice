import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import {
  getCommunityMembersForCommunityId,
  removeFromCommunity,
} from "../../../api/directoryApi";
import { useDispatch } from "react-redux";
import { camelCase, isEmpty, lowerCase } from "lodash";
import Loading from "../../../components/Loading";
import Nodata from "../../../components/Nodata";
import { useNavigate, useParams } from "react-router-dom";
import List, { Row, RowCell } from "../../../components/List";
import CommonBox from "../../../components/CommonBox";
import MemberSearchFiltterComponent from "../MemberSearchFilterComponent";
import { useDebounce } from "use-debounce";
import { SidePane } from "../../../components/SidePane";
import { useSelector } from "react-redux";
import {
  setCloseReset,
  setSuccessReset,
} from "../../../redux/successReducer.js";
import AddMemberForm from "./AddMemberForm.jsx";
import { useConfigManager } from "../../../hooks/useConfig.ts";

export default function MemberList() {
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();
  const { close } = useSelector((state) => state.success);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { success } = useSelector((state) => state.success);
  const [userToRemove, setUserToRemove] = React.useState(null);
  const [isRemovingUser, setIsRemovingUser] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const communityId = id;
  const [query, setQuery] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const [overlay, setOverlay] = React.useState();
  // console.log("communityIdcommunityId", communityId);

  const [showOnlyFamilyHeads, setShowOnlyFamilyHeads] = React.useState(true);
  const [filter, setFilter] = React.useState({
    limit: 100,
    skip: 0,
  });

  const [debouncedText] = useDebounce(query?.replace(/\s/g, "").trim(), 500);

  const { skip, limit, ...restFilter } = filter;
  React.useEffect(() => {
    if (success) {
      onClose1();
      dispatch(setSuccessReset());
      fetchData();
    }
  }, [success]);
  React.useEffect(() => {
    if (close) {
      onClose1();
      dispatch(setCloseReset());
    }
  }, [close]);

  // succes->true close and toast
  // close-> close only

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

  const { config } = useConfigManager();

  if (isEmpty(data) && loading) return <Loading />;

  if (isEmpty(data)) return <Nodata />;

  if (error) return <Text>Error!!</Text>;

  return (
    <CommonBox
      title={`All Family Members`}
      height="80vh"
      buttons={[
        {
          text: `Add Member`,
          backgroundColor: "white",
          textColor: "#0777FF",
          symbol: "+",
          onClick: onOpen1,
        },
      ]}
    >
      <SidePane isOpen={isOpen1} onClose={onClose1}>
        <AddMemberForm />
      </SidePane>
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
              }}
            >
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
        mx={8}
        pb={2}
        pt={2}
      >{`Showing ${data?.members?.count} members`}</Text>
      {data?.members?.count === 0 ? (
        <Box style={{ height: "50vh" }}>
          <Nodata />
        </Box>
      ) : (
        <>
          <List
            columns={["Name", "Number", "Full Address", "Locality", ""]}
            data={data?.members?.rows}
            renderRow={({ item }) => {
              return (
                <Row
                  onClick={() => {
                    const url = `/dashboard/community/${communityId}/member/${item?.id}`;
                    navigate(url);
                  }}
                >
                  <RowCell value={`${item?.firstName} ${item?.lastName}`} />
                  <RowCell value={item?.phone} />
                  <RowCell value={`${item?.address?.fullAddress || ""}`} />
                  <RowCell value={item?.address?.locality} />
                  <RowCell>
                    <Button
                      size={"sm"}
                      onClick={(e) => {
                        e?.stopPropagation();
                        setUserToRemove(item);
                        setOverlay(<Overlay />);
                        onOpen();
                      }}
                    >
                      Remove
                    </Button>
                  </RowCell>
                </Row>
              );
            }}
          />
        </>
      )}
    </CommonBox>
  );
}
