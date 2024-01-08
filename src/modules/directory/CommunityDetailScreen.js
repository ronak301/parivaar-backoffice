import React from "react";
import Base from "../../components/Base";
import MemberList from "./components/MemberList";
import CommunityInfo from "./components/CommunityInfo";
import ExecutiveMembers from "./components/ExecutiveMembers";
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

export default function CommunityDetailsScreen() {
  return (
    <Base>
      <Tabs>
        <TabList>
          <Tab>Members</Tab>
          <Tab>Community Details</Tab>
          <Tab>Executive Members</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />

        <TabPanels>
          <TabPanel>
            <MemberList />
          </TabPanel>
          <TabPanel>
            <CommunityInfo />
          </TabPanel>

          <TabPanel>
            <ExecutiveMembers />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Base>
  );
}
