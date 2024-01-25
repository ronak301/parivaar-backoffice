import React, { useEffect, useState } from "react";
import { Button, Grid, GridItem, Text } from "@chakra-ui/react";
import login from "../../assets/re.png";
import {
  Image,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Logo from "../../api/logo.jpg";
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            gap: "2rem",
          }}
        >
          <FormControl isRequired isInvalid={errors.phoneNumber}>
            <FormLabel>Enter Phone Number</FormLabel>
            <InputGroup>
              <InputLeftAddon children="+91" />
              <Input
                type="tel"
                placeholder="00000-00000"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid Phone Number Format",
                  },
                })}
                style={{
                  width: "15rem",
                  fontSize: "1.2rem",
                  paddingInline: "1rem",
                  fontWeight: "400",
                  fontFamily: "Arial",
                  background: "#F5F7F9",
                }}
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
            backgroundColor: "#0777FF",
            color: "white",
            width: "30%",
            borderRadius: "0.5rem",
          }}
        >
          Get Otp
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
    <>
      <>
        <Grid templateColumns="repeat(2, 1fr)" gap={0}>
          <GridItem overflowY="auto" width={"100%"} h="100%">
            <Image src={login} alt="login" />
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            style={{
              display: "flex",
              flexDirection: "column",

              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                margin: "auto",
                width: "100%",

                height: "85%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0rem",
                padding: "2rem",
              }}
            >
              <Box style={{ textAlign: "center", marginTop: "5rem" }}>
                <Text style={{ fontWeight: "600", fontSize: "2.3rem" }}>
                  Welcome to Parivaar App
                </Text>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",

                    paddingTop: "1rem",
                  }}
                >
                  <Avatar src={Logo} size="xl" />
                </Box>
              </Box>

              <Box
                style={{
                  padding: "0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  width: "109%",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <SubmitForm
                  setSuccess={setSuccess}
                  setLoading={setLoading}
                  loading={loading}
                  setPhoneNumber={setPhoneNumber}
                />

                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></Box>
              </Box>
              <Box style={{ textAlign: "center", paddingTop: "7rem" }}>
                <Text>भारत से 🇮🇳 भारत के लिए ❤️</Text>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </>
    </>
  );
};

export default LoginPage;
