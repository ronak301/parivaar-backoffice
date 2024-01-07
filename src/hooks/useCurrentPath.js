import { matchRoutes, useLocation } from "react-router-dom";

const routes = [
  { path: "/dashboard" },
  { path: "/dashboard/community/:id" },
  { path: "/community/:id/add-member/invite" },
];

export const useCurrentPath = () => {
  const location = useLocation();
  const [{ route }] = matchRoutes(routes, location);

  return route.path;
};
