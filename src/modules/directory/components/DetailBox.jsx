import React from "react";
import { Box, Text } from "@chakra-ui/react";
import moment from "moment";

const DetailBox = ({ item, style, properties, fontSize }) => {
  console.log("item", item);
  return (
    <Box
      style={{
        paddingTop: "22px",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: "30px",
        width: "15rem",

        ...style,
      }}
    >
      {properties.map((property, indx) => {
        return (
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",

              height: "100%",
            }}
          >
            <Box
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: "column",
                gap: "5px",
                justifyContent: "center",

                alignItems: "flex-start",
              }}
            >
              <Text
                noOfLines={1}
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "15rem",
                  fontFamily: "Arial",
                  color: "#666666",
                  ...fontSize,
                }}
              >
                {property}
              </Text>

              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "18px",
                  fontFamily: "Arial",
                  width: "100%",
                  color: "#000000",
                  ...fontSize,
                }}
              >
                {item.find((entry) => entry.key === property)?.value}
              </Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default DetailBox;
