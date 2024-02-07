import React, { useState } from "react";
import { Button, Grid, Text, Divider } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { verifyOtp } from "../../api/authApi";
import { PinInput, PinInputField } from "@chakra-ui/react";
import Logo from "../../assets/head.jpg";
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

  const handleSubmit = (e) => {
    e.preventDefault();

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

  /* <form
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
>*/
  const isOtpValid = otp.length === 6;
  console.log(isOtpValid);
  return (
    <>
      <Box style={{ overflowY: "hidden", height: "95vh" }}>
        <Box
          style={{
            height: "9.5vh",
            position: "sticky",
            display: "flex",
            alignItems: "center",
            border: "1px solid #EAEAEA",
            top: "0",
          }}
          paddingInline={{ base: "1rem", md: "1rem", lg: "2.5rem" }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            gap={{ base: "0.3rem", md: "0.3rem", lg: "0.7rem" }}
          >
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
              fontSize={{ base: "1rem", md: "1.1rem", lg: "1.3rem" }}
            >
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

            alignItems: "center",
          }}
        >
          <Box
            style={{
              border: "1px solid #999696",
              borderRadius: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",

              paddingTop: "1rem",
              paddingBottom: "1.3rem",
            }}
            w={[380, 350, 550]}
            h={[400, 380, 350]}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                style={{
                  color: "#0777FF",
                  fontWeight: "800",
                  fontSize: "1.2rem",
                }}
              >
                OTP Verify
              </Text>
              <Divider color={"#EAEAEA"} width={"100%"} />
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
                paddingTop: "1rem",
                width: "100%",
                paddingInline: "2.2rem",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "600",
                }}
                fontSize={{ base: "1.2rem", md: "1.2rem", lg: "1.4rem" }}
              >
                Welcome to Parivaar App
              </Text>

              <Text style={{ paddingTop: "0.5rem" }}>
                Enter the OTP sent to your registered phone number
              </Text>
              <form onSubmit={handleSubmit}>
                <Box style={{ paddingTop: "1rem" }}>
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
                </Box>
                <Button
                  disabled={!isOtpValid}
                  type="submit"
                  isLoading={loading}
                  style={{
                    backgroundColor: "#0777FF",
                    color: "white",
                    width: "100%",
                    marginTop: "1.5rem",
                    height: "3rem",
                    borderRadius: "0.5rem",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Verify OTP
                </Button>
              </form>
              <Text
                style={{
                  color: "#767070",
                  fontSize: "1rem",
                  fontWeight: "400",
                  paddingTop: "0.8rem",
                  paddingBottom: "0.5rem",
                }}
                noOfLines={2}
              >
                We have sent an OTP to your registered phone number
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default VerifyOtp;
