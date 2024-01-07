import React from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { LayoutDashboard } from "lucide-react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Wrapper() {
  return (
    <Flex>
      <Box w="15%" h="100vh">
        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            to="/dashboard"
          />
        </Sidebar>
      </Box>
      <Box flex={1}>
        <Navbar />
        <Outlet />
      </Box>
    </Flex>
  );
}
