import { Box, Flex, Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useCurrentPath } from "../hooks/useCurrentPath";

export default function Sidebar({ children }) {
  return (
    <aside w="100%" style={{ height: "100%" }}>
      <Box
        backgroundColor="black"
        flex={1}
        h="100vh"
        w={"100%"}
        pt={4}
        position={"static"}
      >
        <nav className="h-full flex flex-col bg-white border-r shadow-sm ">
          <div className="mt-16 p-4 pb-2 flex justify-between items-center">
            <Text
              fontWeight={"700"}
              fontSize={28}
              mt={4}
              pl={8}
              color="white"
              pb={8}
              mb={4}
            >
              Parivaar
            </Text>
          </div>

          <ul
            style={{
              height: "85vh",
              display: "flex",
              flexDirection: "column",
            }}
            className="px-3"
          >
            {children}
          </ul>
        </nav>
      </Box>
    </aside>
  );
}

export function SidebarItem({ icon, text, to }) {
  const currentPath = useCurrentPath();
  const isSelected = currentPath?.includes(to);
  const backgroundColor = isSelected ? "rgb(48,59,73)" : "black";
  return (
    <ChakraLink to={to} as={ReactRouterLink}>
      <Flex
        p={2}
        m={2}
        mx={4}
        borderRadius={"md"}
        alignItems="center"
        backgroundColor={backgroundColor}
        _hover={{
          cursor: "pointer",
          background: "rgb(48,59,73)",
          color: "teal.500",
        }}
      >
        <Box color="white">{icon}</Box>
        <Box ml={2} color="white" fontSize={16}>
          {text}
        </Box>
      </Flex>
    </ChakraLink>
  );
}
