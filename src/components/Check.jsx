import React from "react";
import { isEmpty } from "lodash";
import { Box } from "@chakra-ui/react";

const Check = ({ ifPresent, children }) => {
  if (ifPresent || !isEmpty(ifPresent)) return children;
  return <Box />;
};

export default Check;
