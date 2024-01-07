import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CommunityDetailScreen from "./modules/directory/CommunityDetailScreen";
import Wrapper from "./components/Wrapper";
import InviteMember from "./modules/directory/InviteMember";

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
      ],
    },
    {
      path: "/community/:id/add-member/invite",
      element: InviteMember,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
