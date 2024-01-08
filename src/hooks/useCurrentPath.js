import { matchRoutes, useLocation } from "react-router-dom";

const routes = [
  { path: "/" },
  { path: "/dashboard" },
  { path: "/dashboard/community/:id" },
  { path: `/dashboard/community/:communityId/member/:memberId` },
  { path: "/community/:id/add-member/invite" },
  { path: "/all-users" },
  { path: "/leads" },
];

export const useCurrentPath = () => {
  const location = useLocation();
  const [{ route }] = matchRoutes(routes, location);

  return route?.path;
};
