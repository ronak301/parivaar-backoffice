import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";

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
        const [key, heading] = Object.entries(property)[0];
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
                    fontFamily: "Clash Display",
                    color: "#666666",
                  }}
                >
                  {heading}
                </Text>
                {key === "logo" ? (
                  <Image
                    src={item[key]}
                    alt={`Logo for ${key}`}
                    borderRadius={"5rem"}
                    boxSize="100px"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                      fontFamily: "Clash Display",
                      color: "#000000",
                    }}
                  >
                    {item[key]}
                  </Text>
                )}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default DetailBox;
