import { Box, Text, Button } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function CommonBox({
  children,
  title,
  buttons,
  isSuperAdmin,
  height,
  relation,
  approvalStatus,
}) {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <Box
      mt={1}
      bg="white"
      width={"99%"}
      height={height ? height : "auto"}
      border={"1px solid #E2E8F0"}
      marginLeft={2}
      px={1}
      py={4}
      borderRadius={"lg"}
      shadow={"lg"}
      overflowY={"auto"}
    >
      <Box
        style={{
          width: "100%",
          display: "flex",

          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "4rem",
        }}
      >
        <Box style={{ display: "flex", alignItems: "center", padding: "1rem" }}>
          <Box>
            <ArrowBackIcon
              onClick={handleBackButtonClick}
              style={{ fontSize: "1.2rem" }}
            >
              Back
            </ArrowBackIcon>
          </Box>
          <Box>
            <Text mx={8} fontWeight={"700"} fontSize={16}>
              {title}{" "}
              {isSuperAdmin === true && (
                <Badge
                  colorScheme="blue"
                  style={{ padding: "0.2rem", marginLeft: "0.5rem" }}
                >
                  Super Admin
                </Badge>
              )}{" "}
              {approvalStatus === "APPROVED" && (
                <Badge
                  colorScheme="green"
                  style={{ padding: "0.2rem", marginLeft: "0.2rem" }}
                >
                  Approved
                </Badge>
              )}{" "}
              {relation && (
                <Badge
                  colorScheme="purple"
                  style={{ padding: "0.2rem", marginLeft: "0.2rem" }}
                >
                  {relation === "HEAD" ? "Family Head" : "Family Member"}
                </Badge>
              )}
            </Text>
          </Box>
        </Box>

        {buttons && (
          <Box style={{ display: "flex", gap: "1rem" }}>
            {buttons
              .filter((button) => {
                return Object.keys(button).length !== 0;
              })
              .map((button, index) => (
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
                  {button?.icon && <Box>{button?.icon}</Box>}
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
                      {button?.symbol}
                    </Text>
                    <Text
                      style={{
                        color: button.textColor || "#0777FF",
                        fontFamily: "Arial",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      {button?.text || "Button"}
                    </Text>
                  </Box>
                </Button>
              ))}
          </Box>
        )}
      </Box>

      <Box mb={4} mt={4} style={{}}>
        {children}
      </Box>
    </Box>
  );
}
