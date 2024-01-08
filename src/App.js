import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CommunityDetailScreen from "./modules/directory/CommunityDetailScreen";
import Wrapper from "./components/Wrapper";
import InviteMember from "./modules/directory/InviteMember";
import MemberDetailsScreen from "./modules/directory/MemberDetailsScreen";
import AllUsers from "./modules/directory/components/AllUsers";
import LeadsScreen from "./modules/leads/LeadsScreen";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Wrapper />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/dashboard/community/:id",
          element: <CommunityDetailScreen />,
        },
        {
          path: `/dashboard/community/:communityId/member/:memberId`,
          element: <MemberDetailsScreen />,
        },
        {
          path: `/all-users`,
          element: <AllUsers />,
        },
        {
          path: `/leads`,
          element: <LeadsScreen />,
        },
      ],
    },
    {
      path: "/community/:id/add-member/invite",
      element: <InviteMember />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
