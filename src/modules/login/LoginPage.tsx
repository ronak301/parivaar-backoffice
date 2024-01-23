import React, { useEffect, useState } from "react";
import { Button, Grid, GridItem, Text } from "@chakra-ui/react";
import login from "../../assets/re.png";
import { Image } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import Logo from "../../assets/Log.png";
import { useForm } from "react-hook-form";
import { sendOtp } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import {
  InputAddon,
  InputGroup,
  InputAddonProps,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

const SubmitForm = ({ setSuccess, setLoading, setPhoneNumber, loading }) => {
  const [sub, setSub] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const onSubmit = (data) => {
    console.log("in submit");
    setLoading(true);
    console.log(data);
    console.log(data.phoneNumber);
    setPhoneNumber(data.phoneNumber);

    const submitOtp = async () => {
      const response = await sendOtp(data.phoneNumber);
      console.log(response);

      setOtpSent(true);
      setTimeout(() => {
        setOtpSent(false);
        setLoading(false);
        setSuccess(true);
      }, 3000);
    };

    submitOtp();
  };

  const { register, handleSubmit, formState } = useForm({
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
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "2rem",

            width: "100%",
            gap: "2rem",
            marginInline: "auto",
          }}
        >
          <Box style={{ width: "100%" }}>
            <Text
              style={{
                color: "#767070",
                fontSize: "0.7rem",
                fontWeight: "400",
                textAlign: "center",
                width: "100%",
                lineHeight: "normal",
                paddingBottom: "0.5rem",
              }}
            >
              Please Enter your Number
            </Text>
            {sub && !formState.isValid && (
              <Text
                style={{
                  color: "red",
                  width: "100%",
                  fontSize: "0.7rem",
                }}
              >
                Invalid phone number
              </Text>
            )}
          </Box>

          <InputGroup>
            <InputLeftAddon children="+91" />
            <Input
              type="tel"
              placeholder="00000-00000"
              {...register("phoneNumber", {
                pattern: /^[0-9]{10}$/,
              })}
              style={{
                color: "#8897AE",
                width: "17rem",
                height: "2.5rem",
                fontSize: "1.3rem",
                fontWeight: "400",
                fontFamily: "Arial",
                background: "#F5F7F9",
              }}
            />
          </InputGroup>

          <Text
            style={{
              color: "red",
              fontSize: "0.7rem",
              opacity: "0",
              width: "80%",
            }}
          >
            Invalid phone number
          </Text>
        </Box>

        <Button
          type="submit"
          isLoading={loading}
          loadingText="Loading"
          spinnerPlacement="start"
          onClick={() => {
            setSub(true);
          }}
          style={{
            backgroundColor: "#0777FF",
            color: "white",
            width: "10rem",
            borderRadius: "0.5rem",
          }}
        >
          Get Otp
        </Button>
      </form>
      {otpSent && (
        <Box style={{ position: "sticky" }}>
          <Text style={{ color: "green", marginTop: "1rem" }}>
            OTP has been sent to your phone number successfuly!
          </Text>
        </Box>
      )}
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
                gap: "2rem",
                padding: "2rem",
              }}
            >
              <Box style={{ textAlign: "center" }}>
                <Text style={{ fontWeight: "600", fontSize: "2.3rem" }}>
                  Welcome to Parivaar App
                </Text>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "1rem",
                  }}
                >
                  <Image src={Logo} style={{ width: "50", height: "50" }} />
                </Box>
              </Box>

              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",

                  gap: "1rem",
                  paddingTop: "1.4rem",
                  width: "109%",
                  justifyContent: "center",
                  alignItems: "center",
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
