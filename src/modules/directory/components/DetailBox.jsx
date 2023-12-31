import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { property } from "lodash";

const DetailBox = ({ item, style, properties }) => {
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
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "24px",
                    width: "15rem",
                    fontFamily: "Arial",
                    color: "#666666",
                  }}
                >
                  {property}
                </Text>

                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "24px",
                    fontFamily: "Arial",
                    color: "#000000",
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
