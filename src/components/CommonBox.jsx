import { Box, Text, Button } from "@chakra-ui/react";
import React from "react";

export default function CommonBox({ children, title, buttons }) {
  return (
    <Box
      mt={1}
      bg="white"
      marginLeft={10}
      py={4}
      borderRadius={"lg"}
      shadow={"lg"}
      overflowY={"auto"}
    >
      <Box
        style={{
          width: "95%",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "4rem",
        }}
      >
        <Text mx={8} fontWeight={"700"} fontSize={16}>
          {title}
        </Text>
        {buttons && (
          <Box style={{ display: "flex" }}>
            {buttons.map((button, index) => (
              <Button
                onClick={button.onClick || ""}
                key={index}
                style={{
                  padding: "1rem",
                  backgroundColor: button.backgroundColor || "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  borderRadius: "1.125rem",
                  border: button.border || "1px solid #0777FF",
                  gap: "6px",
                  ...button.style,
                }}
              >
                {button.icon && <Box>{button.icon}</Box>}
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <Text
                    style={{
                      color: button.textColor || "#0777FF",
                      fontFamily: "Arial",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {button.symbol}
                  </Text>
                  <Text
                    style={{
                      color: button.textColor || "#0777FF",
                      fontFamily: "Arial",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {button.text || "Button"}
                  </Text>
                </Box>
              </Button>
            ))}
          </Box>
        )}
      </Box>

      <Box mb={4} mt={4}>
        {children}
      </Box>
    </Box>
  );
}
