import React, { useState } from "react";
import { Button, Grid, Text } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { verifyOtp } from "../../api/authApi";
import { PinInput, PinInputField } from "@chakra-ui/react";
import Logo from "../../assets/Log.png";
import { Box } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import login from "../../assets/re.png";
import { GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { Image } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setAuthToken } from "../../redux/authReducer";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        }
      };
      verify();
    } else {
      setShowAlert(true);
      console.log("Invalid OTP");
    }
  };

  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [success, navigate]);

  const isOtpValid = otp.length === 6;
  console.log(isOtpValid);
  return (
    <>
      {success && (
        <Box
          style={{
            padding: "1rem",
            position: "sticky",
            top: "0",

            right: "0",
            backgroundColor: "#DFF2E4",
            borderRadius: "0.5rem",
          }}
        >
          <Text style={{ color: "#007547", fontWeight: "bold" }}>
            Verification Successful! You are now logged in.
          </Text>
        </Box>
      )}
      {showAlert && (
        <Alert status="error" marginTop="0rem">
          <AlertIcon />
          Invalid OTP. Please enter a 6-digit OTP.
        </Alert>
      )}
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
              <Image src={Logo} height={100} />
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
