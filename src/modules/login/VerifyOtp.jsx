import React, { useState } from "react";
import { Button, Grid, Text } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { verifyOtp } from "../../api/authApi";
import { PinInput, PinInputField } from "@chakra-ui/react";
import Logo from "../../api/logo.jpg";
import { Box } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import login from "../../assets/re.png";
import { GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { Image } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setAuthToken } from "../../redux/authReducer";
import { useToast } from "@chakra-ui/react";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const number = location.state ? location.state.phoneNumber : null;
  console.log(number);
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const handleChange = (value, index) => {
    const updatedOtp = otp.split("");
    updatedOtp[index] = value.nativeEvent.data;
    setOtp(updatedOtp.join(""));
  };
  console.log("otp is", otp);
  const [showAlert, setShowAlert] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    if (isOtpValid) {
      setShowAlert(false);
      console.log("phone number is ", number);
      console.log("otp is ", otp);
      const verify = async () => {
        const res = await verifyOtp(number, otp);
        const authToken = res.data.data.jwt;
        if (authToken) {
          console.log("auth token is ", authToken);
          dispatch(setAuthToken(authToken));
          setLoading(false);
          setSuccess(true);
          toast({
            title: "Success",
            description: "You are successfully logged in",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      };
      verify();
      setLoading(false);
    } else {
      toast({
        title: "Error",
        description: "Invalid Otp entered",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log("Invalid OTP");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/dashboard");
    }
  }, [success, navigate]);

  const isOtpValid = otp.length === 6;
  console.log(isOtpValid);
  return (
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
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              padding: "2rem",
              width: "70%",
              height: "100%",
              margin: "auto",
              marginTop: "0rem",
              marginBottom: "5rem",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <Text
              style={{
                color: "#333",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: "1rem",
              }}
            >
              WELCOME TO PARIVAAR APP
            </Text>

            <Text
              style={{
                color: "#333",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: "1rem",
              }}
            >
              <Avatar src={Logo} size="xl" />
            </Text>
            <Text
              style={{
                color: "#767070",
                fontSize: "1rem",
                fontWeight: "400",
                textAlign: "center",
                paddingBottom: "0.5rem",
              }}
            >
              We have sent an OTP to your registered phone number. Please enter
              the OTP below to verify.
            </Text>
            <HStack spacing="1rem">
              <PinInput otp>
                {[...Array(6)].map((_, index) => (
                  <PinInputField
                    key={index}
                    onChange={(value) => handleChange(value, index)}
                    borderRadius="0.25rem"
                    borderColor="#ddd"
                    borderWidth="2px"
                    fontSize="1.5rem"
                    textAlign="center"
                    width="3rem"
                    height="3rem"
                  />
                ))}
              </PinInput>
            </HStack>
            <Button
              disabled={!isOtpValid}
              type="submit"
              isLoading={loading}
              style={{
                backgroundColor: "#0777FF",
                color: "white",
                width: "15rem",
                height: "3rem",
                borderRadius: "0.5rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Verify OTP
            </Button>
          </form>
        </GridItem>
      </Grid>
    </>
  );
};

export default VerifyOtp;
