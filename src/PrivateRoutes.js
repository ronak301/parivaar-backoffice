import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoutes = () => {
  const auth = useSelector((state) => state.auth);

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
