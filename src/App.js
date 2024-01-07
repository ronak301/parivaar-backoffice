import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CommunityDetailScreen from "./modules/directory/CommunityDetailScreen";
import Wrapper from "./components/Wrapper";

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
          path: "/community/:id",
          element: <CommunityDetailScreen />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
