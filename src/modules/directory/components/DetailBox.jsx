import React from "react";
import { Box, Text } from "@chakra-ui/react";

const DetailBox = ({ item, style, properties, fontSize }) => {
  return (
    <Box
      style={{
        paddingTop: "22px",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: "30px",
        width: "100%",
        ...style,
      }}
    >
      {properties.map((property, indx) => {
        return (
          <Box key={indx}>
            <Box style={{ display: "flex", flexDirection: "column" }}>
              <Box
                style={{
                  display: "flex",
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
                    width: "50%",

                    fontWeight: 500,
                    lineHeight: "18px",
                    fontFamily: "Arial",
                    color: "#000000",
                    ...fontSize,
                  }}
                >
                  {item.find((entry) => entry.key === property)?.value}
                </Text>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default DetailBox;
