import React from "react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CommunityDetailScreen from "./modules/directory/CommunityDetailScreen";
import Wrapper from "./components/Wrapper";
import InviteMember from "./modules/directory/InviteMember";
import MemberDetailsScreen from "./modules/directory/MemberDetailsScreen";
import AllUsers from "./modules/directory/components/AllUsers";
import LeadsScreen from "./modules/leads/LeadsScreen";
import LoginPage from "./modules/login/LoginPage.jsx";
import VerifyOtp from "./modules/login/VerifyOtp.jsx";
import PrivateRoutes from "./PrivateRoutes.js";
import { Routes, Route } from "react-router-dom";

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Wrapper />,
//       children: [
//         {
//           path: "/dashboard",
//           element: <Dashboard />,
//         },
//         {
//           path: "/dashboard/community/:id",
//           element: <CommunityDetailScreen />,
//         },
//         {
//           path: `/dashboard/community/:communityId/member/:memberId`,
//           element: <MemberDetailsScreen />,
//         },
//         {
//           path: `/all-users`,
//           element: <AllUsers />,
//         },
//         {
//           path: `/leads`,
//           element: <LeadsScreen />,
//         },
//       ],
//     },
//     {
//       path: "/community/:id/add-member/invite",
//       element: <PrivateRoute element={<InviteMember />} />,
//     },
//     {
//       path: "/login",
//       element: <LoginPage />,
//     },
//     {
//       path: "/login/verify",
//       element: <VerifyOtp />,
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Wrapper />} path="/">
              <Route element={<Dashboard />} path="/dashboard" />

              <Route
                element={<CommunityDetailScreen />}
                path="/dashboard/community/:id"
              />
              <Route
                element={<MemberDetailsScreen />}
                path="/dashboard/community/:communityId/member/:memberId"
              />
              <Route element={<AllUsers />} path="/all-users" />
              <Route element={<LeadsScreen />} path="/leads" />
              <Route
                element={<InviteMember />}
                path="/community/:id/add-member/invite"
              />
            </Route>
          </Route>

          <Route element={<LoginPage />} path="/login" />
          <Route element={<VerifyOtp />} path="/login/verify" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
