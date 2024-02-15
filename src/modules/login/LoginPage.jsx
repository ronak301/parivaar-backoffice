import React, { useEffect, useState } from "react";
import { Button, Grid, GridItem, Text, Divider } from "@chakra-ui/react";

import {
  Image,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Logo from "../../assets/head.jpg";
import { Avatar } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { sendOtp } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { InputGroup, InputLeftAddon } from "@chakra-ui/react";

const SubmitForm = ({ setSuccess, setLoading, setPhoneNumber, loading }) => {
  const toast = useToast();

  const onSubmit = (data) => {
    console.log("in submit");
    setLoading(true);
    console.log(data);
    console.log(data.phoneNumber);
    setPhoneNumber(data.phoneNumber);
    const submitOtp = async () => {
      const response = await sendOtp(data.phoneNumber);
      console.log(response);

      setLoading(false);

      setSuccess(true);
      toast({
        title: "Otp Sent ",
        description: "We've successfully sent otp to your phone number",
        status: "success",
        duration: 1100,
        isClosable: true,
      });
    };

    submitOtp();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ paddingTop: "0.3rem" }}>
        <Box>
          <FormControl isRequired isInvalid={errors.phoneNumber}>
            <FormLabel
              style={{ paddingBottom: "0.2rem" }}
              fontSize={{ base: "0.85rem", md: "0.85rem", lg: "14" }}>
              Enter Phone Number
            </FormLabel>
            <InputGroup>
              <InputLeftAddon fontSize={14} children="+91" />
              <Input
                type="tel"
                placeholder="Phone Number"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter 10 digit phone number",
                  },
                })}
                style={{
                  width: "100%",
                  fontSize: 14,
                  paddingInline: "1rem",
                  fontWeight: "400",
                  fontFamily: "Arial",
                  background: "#F5F7F9",
                }}
                fontSize={{ base: "1rem", md: "1rem", lg: "1.2rem" }}
              />
            </InputGroup>
            <FormErrorMessage>
              {!!errors.phoneNumber && errors.phoneNumber.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Button
          type="submit"
          isLoading={loading}
          loadingText="Loading"
          spinnerPlacement="start"
          style={{
            marginTop: "2.5rem",
            height: "3rem",
            width: "100%",
            borderRadius: "0.5rem",
            backgroundColor: "#0777FF",
            color: "white",
          }}>
          Get OTP
        </Button>
      </form>
    </>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  useEffect(() => {
    if (success && phoneNumber != null) {
      navigate("/login/verify", { state: { phoneNumber: phoneNumber } });
    }
  }, [success, phoneNumber, navigate]);
  return (
    <Box style={{ overflowY: "hidden", height: "100vh" }}>
      <Box
        style={{
          height: "9.5vh",
          position: "sticky",
          display: "flex",
          alignItems: "center",
          border: "1px solid #EAEAEA",
          top: "0",
        }}
        paddingInline={{ base: "1rem", md: "1rem", lg: "2.5rem" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          gap={{ base: "0.3rem", md: "0.3rem", lg: "0.7rem" }}>
          <Image
            boxSize={{ base: "40px", md: "40px", lg: "60px" }}
            objectFit="cover"
            borderRadius={"100px"}
            src={Logo}
            alt="logo"
          />
          <Text
            style={{
              color: "#0777FF",
              fontWeight: "900",
            }}
            fontSize={{ base: "1rem", md: "1.1rem", lg: "1.3rem" }}>
            Parivaar
          </Text>
        </Box>
      </Box>
      <Box
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}>
        <Box
          style={{
            marginTop: "8rem",
            boxShadow: "0px 0px 10px 0px #d3d3d3",
            border: "1px solid #eaeaea",
            borderRadius: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "1rem",
            paddingBottom: "1.3rem",
          }}
          w={[350, 350, 550]}
          h={[330, 330, 350]}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "center",
              width: "100%",
            }}>
            <Text
              style={{
                color: "#0777FF",
                fontWeight: "800",
                fontSize: "1.2rem",
              }}>
              Login
            </Text>
            <Divider color={"#EAEAEA"} width={"100%"} />
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem",
              paddingTop: "1.8rem",
              width: "100%",
              paddingInline: "2.2rem",
            }}>
            <Text
              style={{
                color: "black",
                fontWeight: "600",
              }}
              fontSize={{ base: "1.2rem", md: "1.2rem", lg: "1.4rem" }}>
              Welcome to Parivaar App
            </Text>
            <SubmitForm
              setSuccess={setSuccess}
              setLoading={setLoading}
              setPhoneNumber={setPhoneNumber}
              loading={loading}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
