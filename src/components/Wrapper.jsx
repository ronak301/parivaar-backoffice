import React from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { LayoutDashboard, Rows4, WeightIcon, LogOut } from "lucide-react";

import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Wrapper() {
  return (
    <Flex style={{ position: "fixed", width: "100%" }}>
      <Box w="20%" h="100vh">
        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            to="/dashboard"
          />
          <SidebarItem
            icon={<Rows4 size={20} />}
            text="All Users"
            to="/all-users"
          />
          <SidebarItem
            icon={<WeightIcon size={20} />}
            text="Leads"
            to="/leads"
          />

          <Box
            style={{
              marginTop: "auto",
              borderTop: "1px solid white",
              paddingBottom: "8px",
            }}
          >
            <SidebarItem
              icon={<LogOut size={20} />}
              text="Logout"
              to="/logout"
            />
          </Box>
        </Sidebar>
      </Box>
      <Box flex={1} overflowY={"scroll"}>
        <Navbar />
        <Outlet />
      </Box>
    </Flex>
  );
}
