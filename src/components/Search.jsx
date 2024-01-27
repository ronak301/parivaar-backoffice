import React, { useEffect, useState } from "react";
import { Button, Grid, GridItem, Text } from "@chakra-ui/react";
import login from "../assets/re.png";
import {
  Image,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Logo from "../assets/head.jpg";
import { Avatar } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { InputGroup, InputLeftAddon } from "@chakra-ui/react";

const Search = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const submitHandler = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      navigate(`/search/user/${phoneNumber}`);
    } else {
      toast({
        title: "Phone Number is not valid",
        description: "Phone Number should be of 10 digits ",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
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
                marginTop: "2rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <form
                onSubmit={submitHandler}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  flexDirection: "column",
                }}
              >
                <Box>
                  <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children="+91" />
                      <Input
                        type="number"
                        placeholder="Enter Phone Number"
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                      />
                    </InputGroup>
                  </FormControl>
                </Box>
                <Button
                  type="submit"
                  loadingText="Loading"
                  spinnerPlacement="start"
                  style={{
                    backgroundColor: "#0777FF",
                    color: "white",
                    width: "20%",
                    borderRadius: "0.5rem",
                  }}
                >
                  Search User
                </Button>
              </form>
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
  );
};

export default Search;
