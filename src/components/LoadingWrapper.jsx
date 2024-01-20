import { isEmpty } from "lodash";
import React from "react";
import Loading from "./Loading";
import Nodata from "./Nodata";
import { Text } from "@chakra-ui/react";

export default function LoadingWrapper({ data, loading, error, children }) {
  if (isEmpty(data) && loading) return <Loading />;

  if (isEmpty(data)) return <Nodata />;

  if (error) return <Text>Error!!</Text>;
  return children;
}
