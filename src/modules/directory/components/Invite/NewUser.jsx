import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
} from "@chakra-ui/react";
import { isEmpty, map } from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import { useApi } from "../../../../api/useApi";
import { addToCommunity, createUser } from "../../../../api/directoryApi";
import { BloodGroups } from "../../../../utils/constants";

export default function NewUser({ communityId, setInviteStatus, phone }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const { request: createUserApi } = useApi(createUser);
  const { request: addUserToCommunityApi } = useApi(addToCommunity);

  const [error, setError] = React.useState("");

  const createUserAndAddToCommunity = async (values) => {
    try {
      const res = await createUserApi(values);
      await addUserToCommunityApi(communityId, res?.data?.id);
      alert("Success!!");
      setInviteStatus("success");
    } catch (err) {
      setError(err?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(createUserAndAddToCommunity)}>
      <FormControl isInvalid={errors.phone}>
        <>
          <Box
            flexDirection={"column"}
            mx={4}
            mt={4}
            mb={6}
            backgroundColor={"white"}
            borderRadius={8}
            py={8}
            px={4}
            flex={1}
            alignItems={"center"}
            justifyContent={"center"}>
            <Text
              fontSize={20}
              fontWeight={"500"}
              color="#262626"
              textAlign={"center"}>
              {"Invite Member"}
            </Text>
            <Text
              mt={16}
              mb={4}
              fontSize={18}
              fontWeight={"400"}
              color="#161616">
              {"Please Enter Member Details"}
            </Text>
            <Input
              {...register("firstName", {
                required: "This is required",
                minLength: {
                  value: 2,
                  message: "Minimum length should be 2",
                },
              })}
              placeholder="Enter First Name"
              size={"lg"}
            />
            <Input
              mt={4}
              {...register("lastName", {
                required: "This is required",
                minLength: {
                  value: 2,
                  message: "Minimum length should be 2",
                },
              })}
              placeholder="Enter Last Name"
              size={"lg"}
            />
            <InputGroup size="lg" mt={4}>
              <InputLeftAddon>+91</InputLeftAddon>
              <Input value={phone} isDisabled />
            </InputGroup>
            <Input
              mt={4}
              {...register("dob")}
              placeholder="Enter Date of Birth"
              size={"lg"}
              type="date"
            />
            <Select {...register("gender")} placeholder="Select Gender" mt={4}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>

            <Select
              mt={4}
              {...register("bloodGroup")}
              placeholder="Select Blood Group">
              {map(BloodGroups, (b) => (
                <option value={b?.id}>{b?.label}</option>
              ))}
            </Select>
            <Box mt={4}>{error ? <Text color="red">{error}</Text> : null}</Box>

            <FormErrorMessage mx={4} mb={2}>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>

            <Box mt={8}>
              <Button
                isDisabled={!isEmpty(errors)}
                type="submit"
                isLoading={isSubmitting}
                w="100%"
                colorScheme="blue">
                {"Continue"}
              </Button>
            </Box>
          </Box>
        </>
      </FormControl>
    </form>
  );
}
