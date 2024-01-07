import { Box, Flex, Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function Sidebar({ children }) {
  return (
    <Box backgroundColor="black" flex={1} h="100vh" pt={4}>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm ">
          <div className="mt-16 p-4 pb-2 flex justify-between items-center">
            <Text
              fontWeight={"700"}
              fontSize={28}
              mt={4}
              pl={8}
              color="white"
              pb={8}
              borderBottomWidth={0.5}
              mb={4}
              borderColor={"rgb(210,210,210)"}>
              Parivaar
            </Text>
          </div>

          <ul className="flex-1 px-3">{children}</ul>
        </nav>
      </aside>
    </Box>
  );
}

export function SidebarItem({ icon, text, to }) {
  return (
    <ChakraLink to={to} as={ReactRouterLink}>
      <Flex
        p={4}
        m={2}
        borderRadius={"md"}
        alignItems="center"
        _hover={{
          cursor: "pointer",
          background: "rgb(48,59,73)",
          color: "teal.500",
        }}>
        <Box color="white">{icon}</Box>
        <Box ml={2} color="white">
          {text}
        </Box>
      </Flex>
    </ChakraLink>
  );
}
