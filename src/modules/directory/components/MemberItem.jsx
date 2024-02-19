import { Button, Text, Select, Td, useToast } from "@chakra-ui/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, RowCell } from "../../../components/List";
import { useConfigManager } from "../../../hooks/useConfig.ts";
import { updateAddress } from "../../../api/directoryApi.js";
import { useApi } from "../../../api/useApi.jsx";

const MemberItem = ({
  index,
  item,
  setUserToRemove,
  onOpen,
  Overlay,
  setOverlay,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const communityId = id;
  const [selectedValue, setSelectedValue] = React.useState(
    item?.address?.locality
  );

  React.useEffect(() => {
    setSelectedValue(item?.address?.locality);
  }, []);

  const { request: updateUserAddress } = useApi(updateAddress);

  React.useEffect(() => {
    setSelectedValue(item?.address?.locality);
  }, []);

  const toast = useToast();

  const { config } = useConfigManager();

  const handleValueChange = async (event) => {
    event?.stopPropagation();
    const newValue = event.target.value;
    console.log("new Value", newValue);
    setSelectedValue(newValue);
    console.log("Item", item);

    try {
      const res = await updateUserAddress(item?.address?.id, {
        locality: newValue,
      });
      if (res?.data?.success)
        toast({
          title: `Successfully Updated Locality to ${newValue}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  console.log("Item", item?.address?.locality, selectedValue);

  const sortedAlphabetically = config?.Localities?.sort((a, b) =>
    a?.label?.localeCompare(b?.label)
  );

  return (
    <Row
      onClick={() => {
        const url = `/dashboard/community/${communityId}/member/${item?.id}`;
        navigate(url);
      }}>
      <RowCell>
        <Text
          fontSize={
            8
          }>{`${index} ${item?.firstName} ${item?.lastName} (${item?.phone})`}</Text>
      </RowCell>
      <Td maxW="300px" whiteSpace="normal" overflowWrap="break-word">
        <Text numberOfLines={4} fontSize={14}>{`${
          item?.address?.fullAddress || ""
        }`}</Text>
      </Td>

      <Td>
        <Select
          onClick={(e) => e?.stopPropagation()}
          value={selectedValue}
          onChange={handleValueChange}
          placeholder="Select option">
          {sortedAlphabetically?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </Select>
      </Td>

      <RowCell>
        <Button
          size={"sm"}
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
};

export default MemberItem;
