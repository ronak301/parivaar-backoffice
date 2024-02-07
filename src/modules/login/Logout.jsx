import React from "react";
import { useDispatch } from "react-redux";
import { setAuthLogout } from "../../redux/authReducer";
import Loading from "../../components/Loading";
const Logout = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setAuthLogout());
  }, [dispatch]);

  return (
    <div>
      <Loading />
    </div>
  );
};

export default Logout;
