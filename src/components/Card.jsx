import React from "react";
import { Card, CardBody, Button, Text, Box, Badge } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";

const UserCard = ({ uimg, name, education, relation, phone }) => {
  console.log(uimg);
  return (
    <Card
      style={{
        width: "90%",
        borderRadius: "2rem",
        boxShadow: "none",
        height: "10rem",
      }}
    >
      <CardBody
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "flex-start",
          marginLeft: "1rem",
        }}
      >
        <Avatar name={name} src={uimg} size="lg" bg="teal.500" color="white" />
        <Box style={{ display: "flex", flexDirection: "column" }}>
          <Text noOfLines={2} style={{ fontWeight: "600", fontSize: "0.8rem" }}>
            {name}
          </Text>
          <Text style={{ fontSize: "0.8rem" }}>{phone}</Text>
          <Text style={{ fontSize: "0.8rem" }}>{education}</Text>
          <Box>
            <Button
              style={{
                borderRadius: "0.2rem",
                width: "2rem",
                backgroundColor: "whitesmoke",
                fontSize: "0.5rem",
                height: "1.5rem",
              }}
            >
              Change
            </Button>
          </Box>
        </Box>
        <Box style={{}}>
          <Badge style={{ borderRadius: "0.5rem", fontSize: "0.5rem" }}>
            {relation}
          </Badge>
        </Box>
      </CardBody>
    </Card>
  );
};

export default UserCard;
