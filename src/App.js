import React from "react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CommunityDetailScreen from "./modules/directory/CommunityDetailScreen";
import Wrapper from "./components/Wrapper";
import SearchUser from "./components/Search.jsx";
import UserDetail from "./components/UserDetail.jsx";
import InviteMember from "./modules/directory/InviteMember";
import MemberDetailsScreen from "./modules/directory/MemberDetailsScreen";
import AllUsers from "./modules/directory/components/AllUsers";

import LeadsScreen from "./modules/leads/LeadsScreen";
import LoginPage from "./modules/login/LoginPage.jsx";
import VerifyOtp from "./modules/login/VerifyOtp.jsx";
import PrivateRoutes from "./PrivateRoutes.js";
import { Navigate } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
import Logout from "./modules/login/Logout.jsx";
import { useLayoutEffect } from "react";
import { Helmet } from "react-helmet";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
const Wrap = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Wrap>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<Logout />} path="/logout" />
              <Route element={<Wrapper />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace={true} />}
                />
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
              </Route>
            </Route>
            <Route
              element={<InviteMember />}
              path="/community/:id/add-member/invite"
            />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<VerifyOtp />} path="/login/verify" />
            <Route element={<SearchUser />} path="/search/user" />
            <Route element={<UserDetail />} path="/search/user/:phoneNumber" />
          </Routes>
        </Wrap>
      </BrowserRouter>
    </div>
  );
}

export default App;
